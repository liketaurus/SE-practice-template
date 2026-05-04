const EditorMode =
{
    EDITOR: 'editEditor',
    RAW: 'editRaw',
    VIEW: 'editView'
};

const TaskEditor = (function() {
    const overlay = document.getElementById('editor-overlay');
    const titleInput = document.getElementById('editor-title');
    const timeInput = document.getElementById('editor-time');
    const modeName = document.getElementById('editor-mode');
    
    const workspace = document.querySelector('.editor-workspace');
    const toolbar = document.querySelector('.editor-toolbar');
    const btnSwapMode = document.getElementById('editor-mode-swap');
    const modalButtons = document.querySelector('.modal-buttons');
    const importButton = document.getElementById('btn-import');
    
    const visualArea = document.getElementById('edit-editor');
    const rawArea = document.getElementById('edit-raw');
    const rawInput = document.getElementById('raw-input');
    const rawPreview = document.getElementById('raw-preview');

    const colorInput = document.getElementById('btn-task-color');
    const modalContent = document.querySelector('.modal-content');

    let currentId = null;
    let currentMode = EditorMode.EDITOR;
    let currentStatus = 'new';
    let currentArchived = 'false';

    const defaultState =
    {
        inputsPointerEvents: 'auto',
        showToolbar: 'flex',
        showSwapBtn: 'block',
        showModalButtons: 'flex',
        showVisualArea: 'block',
        showRawArea: 'none',
        contentEditable: 'true',
        workspaceBorder: '',
        importButton: '',
        colorInput: ''
    };

    const editorStateProperties =
    {
        [EditorMode.EDITOR]: {},
        [EditorMode.RAW]:
        {
            showVisualArea: 'none',
            showRawArea: 'flex',
            contentEditable: 'false'
        },
        [EditorMode.VIEW]:
        {
            inputsPointerEvents: 'none',
            showToolbar: 'none',
            showSwapBtn: 'none',
            showModalButtons: 'none',
            contentEditable: 'false',
            importButton: 'none',
            colorInput: 'none'
        }
    };

    function applyState(mode)
    {
        currentMode = mode;

        const conf = { ...defaultState, ...editorStateProperties[mode] };

        titleInput.style.pointerEvents = conf.inputsPointerEvents;
        timeInput.style.pointerEvents = conf.inputsPointerEvents;
        toolbar.style.display = conf.showToolbar;
        btnSwapMode.style.display = conf.showSwapBtn;
        modalButtons.style.display = conf.showModalButtons;
        visualArea.setAttribute('contenteditable', conf.contentEditable);
        visualArea.style.display = conf.showVisualArea;
        rawArea.style.display = conf.showRawArea;
        workspace.style.border = conf.workspaceBorder;
        importButton.style.display = conf.importButton;
        colorInput.style.display = conf.colorInput;
    }

    const Converter =
    {
        toHTML: function(md)
        {
            if (!md) return '';
            let html = md;

            html = html.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
            html = html.replace(/__(.*?)__/g, '<u>$1</u>');
            html = html.replace(/\*(.*?)\*/g, '<i>$1</i>');

            html = html.replace(/(?:^- (.*)(?:\n|$))+/gm, match =>
            {
                let items = match.trim().split('\n').map(l => `<li>${l.substring(2)}</li>`).join('');
                return `<ul>${items}</ul>`;
            });

            html = html.replace(/\n/g, '<br>');
            return html;
        },
        toMD: function(html)
        {
            if (!html) return '';
            let md = html;

            md = md.replace(/<div><br><\/div>/gi, '\n');
            md = md.replace(/<div>/gi, '\n');
            md = md.replace(/<\/div>/gi, '');
            md = md.replace(/<p>/gi, '\n');
            md = md.replace(/<\/p>/gi, '');
            md = md.replace(/<br>/gi, '\n');

            md = md.replace(/<ul>/gi, '\n');
            md = md.replace(/<\/ul>/gi, '\n');
            md = md.replace(/<li>(.*?)<\/li>/gi, '- $1\n');

            md = md.replace(/<b>(.*?)<\/b>/gi, '**$1**');
            md = md.replace(/<strong>(.*?)<\/strong>/gi, '**$1**');
            md = md.replace(/<i>(.*?)<\/i>/gi, '*$1*');
            md = md.replace(/<em>(.*?)<\/em>/gi, '*$1*');
            md = md.replace(/<u>(.*?)<\/u>/gi, '__$1__');

            return md.replace(/\n{3,}/g, '\n\n').trim(); 
        }
    };

    function applyFormat(command, rawOpen = '', rawClose = '')
    {
        if (currentMode === EditorMode.RAW)
        {
            const start = rawInput.selectionStart;
            const end = rawInput.selectionEnd;
            const text = rawInput.value;
            const selectedText = text.substring(start, end);
            
            let replacement = '';
            if (command === 'insertUnorderedList') replacement = selectedText ? selectedText.split('\n').map(l => '- ' + l).join('\n') : '- ';
            else replacement = rawOpen + selectedText + rawClose;

            rawInput.value = text.substring(0, start) + replacement + text.substring(end);
            rawInput.focus();
            rawInput.selectionStart = start + rawOpen.length;
            rawInput.selectionEnd = end + rawOpen.length + (command === 'insertUnorderedList' ? 0 : selectedText.length);
            
            rawPreview.innerHTML = Converter.toHTML(rawInput.value);
        }
        else
        {
            document.execCommand(command, false, null);
            visualArea.focus();
        }
    }
    
    colorInput.addEventListener('input', (e) =>
    { modalContent.style.setProperty('--task-color', e.target.value); });

    btnSwapMode.addEventListener('click', () =>
    {
        if (currentMode === EditorMode.EDITOR)
        {
            const currentMD = Converter.toMD(visualArea.innerHTML);
            rawInput.value = currentMD;
            rawPreview.innerHTML = Converter.toHTML(currentMD);
            applyState(EditorMode.RAW);
        }
        else if (currentMode === EditorMode.RAW)
        {
            visualArea.innerHTML = Converter.toHTML(rawInput.value);
            applyState(EditorMode.EDITOR);
        }
    });
    rawInput.addEventListener('input', () => {
        rawPreview.innerHTML = Converter.toHTML(rawInput.value);
    });
    document.getElementById('btn-bold').addEventListener('click', () => applyFormat('bold', '**', '**'));
    document.getElementById('btn-italic').addEventListener('click', () => applyFormat('italic', '*', '*'));
    document.getElementById('btn-underline').addEventListener('click', () => applyFormat('underline', '__', '__'));
    document.getElementById('btn-list').addEventListener('click', () => applyFormat('insertUnorderedList'));
    document.getElementById('btn-import').addEventListener('click', () => fileInput.click());
    document.getElementById('btn-export').addEventListener('click', () =>
    {
        const title = titleInput.value.trim() || 'task';
        const rawHTML = visualArea.innerHTML;
        const mdContent = getCurrentMD();
        const id = currentId || Date.now();
        const dueDate = timeInput.value || '';
        const taskColor = colorInput.value;
        const taskStatus = currentStatus;
        const md = 
`---
id: ${id}
status: ${taskStatus}
dueDate: ${dueDate}
color: ${taskColor}
---
# ${title}
${mdContent}`;

        const safeName = title.replace(/[^a-zA-ZА-ЯҐЄІЇа-яґєії0-9 _-]/g, '').trim() || 'task';
        const blob = new Blob([md], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${safeName}.md`;
        a.click();
        URL.revokeObjectURL(url);
    });

    function getCurrentMD()
    { return currentMode === EditorMode.RAW ? rawInput.value : Converter.toMD(visualArea.innerHTML); }

    function open(id = null, title = '', content = '', dueDate = '', mode = EditorMode.EDITOR, color = '#7A6ED6', status = 'new', archived = 'false')
    {
        currentId = id;
        currentStatus = status;
        colorInput.value = color;
        currentArchived = archived;
        modalContent.style.setProperty('--task-color', color);

        if (mode === EditorMode.VIEW) modeName.setAttribute('data-lang', 'viewtask');
        else if (id === null)
        {
            if (!dueDate)
            {
                const now = new Date();
                const offset = now.getTimezoneOffset() * 60000;
                dueDate = new Date(now - offset).toISOString().slice(0, 16);
            }
            modeName.setAttribute('data-lang', 'addtask');
        }
        else modeName.setAttribute('data-lang', 'edittask2');
        
        applyLang(localStorage.getItem('lang') || 'ENG');
        
        titleInput.value = title;
        timeInput.value = dueDate;

        visualArea.innerHTML = Converter.toHTML(content);
        if (mode === EditorMode.RAW)
        {
            rawInput.value = content;
            rawPreview.innerHTML = Converter.toHTML(content);
        }

        applyState(mode);
        
        overlay.classList.remove('none');
        overlay.classList.add('active');
    }

    function close()
    {
        overlay.classList.remove('active');
        setTimeout(() =>
        {
            overlay.classList.add('none');
            currentId = null;
            titleInput.value = '';
            timeInput.value = ''; 
            visualArea.innerHTML = '';
            rawInput.value = '';
            rawPreview.innerHTML = '';
            currentStatus = 'new';
            currentArchived = 'false';
            applyState(EditorMode.EDITOR);
        }, 300);
    }

    function save()
    {
        const savedLang = localStorage.getItem('lang') || 'ENG';
        const title = titleInput.value.trim() || translations[savedLang].untitled;
        const rawHTML = visualArea.innerHTML;
        const mdContent = getCurrentMD() || translations[savedLang].nocontent;
        const taskColor = colorInput.value;
        const id = currentId || Date.now();
        const now = new Date();
        const dueDate = timeInput.value || new Date(now - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
        
        const newMd = 
`---
id: ${id}
status: ${currentStatus}
archived: ${currentArchived}
dueDate: ${dueDate}
color: ${taskColor}
---
# ${title}
${mdContent}`;

        const isNew = !currentId;
        if (currentId) TaskStore.update(id, newMd);
        else TaskStore.add(newMd);

        close();

        setTimeout(() =>
        {
            if (typeof renderGrid === 'function')
            {
                if (document.startViewTransition) document.startViewTransition(() => renderGrid(isNew ? id : null));
                else renderGrid(isNew ? id : null);
            }
        }, 300);
    }
    
    document.getElementById('editor-save').addEventListener('click', save);
    document.getElementById('editor-cancel').addEventListener('click', close);
    

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.md';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    fileInput.addEventListener('change', (e) =>
    {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (ev) =>
        {
            const importedMd = ev.target.result;

            if (typeof TaskRenderer !== 'undefined')
            {
                const parsed = TaskRenderer.parseFrontmatter(importedMd);
                const lines = parsed.content.split('\n');
                const importedColor = parsed.metadata.color || '#7A6ED6';
                colorInput.value = importedColor;
                modalContent.style.setProperty('--task-color', importedColor);
                currentStatus = parsed.metadata.status || 'new';
                titleInput.value = lines[0] ? lines[0].replace('# ', '') : '';
                timeInput.value = parsed.metadata.dueDate || '';
                const body = lines.slice(1).join('\n');
                visualArea.innerHTML = Converter.toHTML(body);
                if (currentMode === EditorMode.RAW)
                {
                    rawInput.value = body;
                    rawPreview.innerHTML = Converter.toHTML(body);
                }
            }
        };
        reader.readAsText(file);
        fileInput.value = '';
    });
    
    return { open, close, save };
})();