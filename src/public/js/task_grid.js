const GridViewMode =
{
    ALL_CARDS: 'allCards',
    ALL_CALENDAR: 'allCalendar',
    DONE: 'done',
    TODAY: 'today',
    ARCHIVE: 'archive'
};

let curGridViewMode = GridViewMode.ALL_CARDS;
let previousBaseMode = GridViewMode.ALL_CARDS;
let calendarOffset = 0;

function setGridViewMode(mode)
{
    if (curGridViewMode === mode) curGridViewMode = GridViewMode.ALL_CARDS;
    else curGridViewMode = mode;

    calendarOffset = 0;
    sortGrid();
}

const taskgrid = document.getElementById('task-grid');

function sortGrid()
{
    if (document.startViewTransition) document.startViewTransition(() => renderGrid());
    else renderGrid();
}

function renderGrid(freshCardID = null)
{
    taskgrid.innerHTML = '';

    if (curGridViewMode === GridViewMode.ALL_CALENDAR)
    {
        taskgrid.classList.add('calendar-mode-active');
        renderCalendarView();
        return;
    }
    taskgrid.classList.remove('calendar-mode-active');
    
    let parsedTasks = [...TaskStore.getParsed()];

    const offset = new Date().getTimezoneOffset() * 60000;
    const localTodayStr = new Date(Date.now() - offset).toISOString().slice(0, 10);

    parsedTasks = parsedTasks.filter(task =>
    {
        const status = task.status;
        const archived = task.archived === 'true' || status === 'archive' || status === 'archived';
        const taskDate = task.dueDate ? task.dueDate.slice(0, 10) : '';

        switch (curGridViewMode)
        {
            case GridViewMode.ALL_CARDS: return !archived;
            case GridViewMode.TODAY: return taskDate === localTodayStr && !archived;
            case GridViewMode.DONE: return status === 'completed' && !archived;
            case GridViewMode.ARCHIVE: return archived;
            default: return true;
        }
    });

    parsedTasks.sort((a, b) =>
    {
        const completedA = a.status === 'completed';
        const completedB = b.status === 'completed';
        if (completedA !== completedB) return completedA ? 1 : -1;

        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Number(a.id);
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Number(b.id);
        return dateB - dateA;
    });

    parsedTasks.forEach(taskObj =>
    {
        const card = TaskRenderer.renderCard(taskObj);
        if (card.getAttribute('data-id') === String(freshCardID)) card.classList.add('animate-in');

        const archived = taskObj.archived === 'true';
        const completed = taskObj.status === 'completed';

        if (archived)
        {
            card.style.opacity = '0.5';
            const btnDelete = card.querySelector('.btn-delete');
            const btnEdit = card.querySelector('.btn-edit');

            const lang = localStorage.getItem('lang') || 'ENG';

            if (btnDelete) { 
                btnDelete.setAttribute('data-lang', 'delete');
                btnDelete.innerText = translations[lang].delete; 
            }
            if (btnEdit) { 
                btnEdit.setAttribute('data-lang', 'unarchive');
                btnEdit.innerText = translations[lang].unarchive; 
            }
        }
        else if (completed) card.style.opacity = '0.5';
         taskgrid.appendChild(card);
    });
    
    applyLang(localStorage.getItem('lang') || 'ENG');
    taskEmptyText();
}

function changeCalendarOffset(direction)
{
    calendarOffset += direction;
    renderGrid();
}

function renderCalendarView()
{
    taskgrid.innerHTML = '';
    const isMobile = window.innerWidth <= 768;
    const lang = localStorage.getItem('lang') || 'ENG';
    const locale = lang === 'UA' ? 'uk-UA' : 'en-US';
    let baseDate = new Date();
    let startDate, endDate, titleStr;

    if (isMobile)
    {
        baseDate.setDate(baseDate.getDate() + (calendarOffset * 7));
        let day = baseDate.getDay() || 7; 
        baseDate.setDate(baseDate.getDate() - day + 1);
        startDate = new Date(baseDate);
        endDate = new Date(baseDate);
        endDate.setDate(endDate.getDate() + 6);
        let mName = startDate.toLocaleString(locale, { month: 'long' });
        mName = mName.charAt(0).toUpperCase() + mName.slice(1);
        titleStr = `${mName} (${startDate.getDate()} - ${endDate.getDate()}) ${startDate.getFullYear()}`;
    }
    else
    {
        baseDate.setMonth(baseDate.getMonth() + calendarOffset);
        baseDate.setDate(1);
        startDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
        endDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0); 
        let mName = startDate.toLocaleString(locale, { month: 'long' });
        mName = mName.charAt(0).toUpperCase() + mName.slice(1);
        titleStr = `${mName} ${startDate.getFullYear()}`;
    }

    const stickyHeaderContainer = document.createElement('div');
    stickyHeaderContainer.className = 'calendar-sticky-header';

    const header = document.createElement('div');
    header.className = 'calendar-header';
    header.innerHTML = `
        <button class="cal-nav-btn" onclick="changeCalendarOffset(-1)">
            <img src="img/c_left.png" class="c-arrow" alt="prev">
        </button>
        <h2 class="cal-title">${titleStr}</h2>
        <button class="cal-nav-btn" onclick="changeCalendarOffset(1)">
            <img src="img/c_right.png" class="c-arrow" alt="next">
        </button>
    `;
    stickyHeaderContainer.appendChild(header);

    const allTasks = TaskStore.getParsed();
    const tasksByDate = {};
    allTasks.forEach(task =>
    {
        if (!task.dueDate || task.archived === 'true' || task.status === 'completed' || task.status === 'archive') return;
        const dKey = task.dueDate.slice(0, 10);
        if (!tasksByDate[dKey]) tasksByDate[dKey] = [];
        tasksByDate[dKey].push({ id: task.id, title: task.title, color: task.color });
    });

    const grid = document.createElement('div');
    grid.className = isMobile ? 'calendar-grid-mobile' : 'calendar-grid-pc';

    if (!isMobile)
    {
        const weekDaysRow = document.createElement('div');
        weekDaysRow.className = 'calendar-weekdays-row';

        const weekDays = [];
        let tempDate = new Date(1970, 0, 5); 
        for (let i = 0; i < 7; i++)
        {
            weekDays.push(tempDate.toLocaleString(locale, { weekday: 'short' }));
            tempDate.setDate(tempDate.getDate() + 1);
        }

        weekDays.forEach(dayName =>
        {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.innerText = dayName;
            weekDaysRow.appendChild(dayHeader);
        });

        stickyHeaderContainer.appendChild(weekDaysRow); 

        let startDay = startDate.getDay() || 7; 
        for (let i = 1; i < startDay; i++)
        {
            const empty = document.createElement('div');
            empty.className = 'calendar-cell empty';
            grid.appendChild(empty);
        }
    }

    taskgrid.appendChild(stickyHeaderContainer);

    let currentDate = new Date(startDate);
    const todayObj = new Date();
    const todayKey = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, '0')}-${String(todayObj.getDate()).padStart(2, '0')}`;
    let actualDayOfWeek = todayObj.getDay() || 7;
    let actualWeekStart = new Date(todayObj);
    actualWeekStart.setDate(todayObj.getDate() - actualDayOfWeek + 1);
    actualWeekStart.setHours(0,0,0,0);
    let actualWeekEnd = new Date(actualWeekStart);
    actualWeekEnd.setDate(actualWeekStart.getDate() + 6);
    actualWeekEnd.setHours(23,59,59,999);
    
    while (currentDate <= endDate)
    {
        const cell = document.createElement('div');
        cell.className = 'calendar-cell';

        const y = currentDate.getFullYear();
        const m = String(currentDate.getMonth() + 1).padStart(2, '0');
        const d = String(currentDate.getDate()).padStart(2, '0');
        const dateKey = `${y}-${m}-${d}`;
        const weekdayName = currentDate.toLocaleString(locale, { weekday: 'short' });
        let labelText = isMobile ? `${currentDate.getDate()} ${weekdayName}` : currentDate.getDate();
        cell.innerHTML = `<div class="calendar-day-label">${labelText}</div>`;

        if (currentDate >= actualWeekStart && currentDate <= actualWeekEnd) cell.classList.add('current-week');
        if (dateKey === todayKey) cell.classList.add('current-day');

        if (tasksByDate[dateKey])
        {
            tasksByDate[dateKey].forEach(t =>
            {
                const chip = document.createElement('div');
                chip.className = 'task-chip';
                const taskColor = t.color ? t.color : 'var(--color-kvadratik)';
                chip.style.borderLeftColor = taskColor;

                chip.innerHTML = `
                    <div class="chip-dot" style="background-color: ${taskColor};"></div>
                    <span class="chip-text">${t.title}</span>
                `;
                
                chip.onclick = (e) => { e.stopPropagation(); viewCard(t.id); };
                cell.appendChild(chip);
            });
        }

        cell.onclick = () => TaskEditor.open(null, '', '', `${dateKey}T09:00`, EditorMode.EDITOR);

        grid.appendChild(cell);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    taskgrid.appendChild(grid);
    taskEmptyText();
}

function addTaskCard()
{ TaskEditor.open(null, '', '', '', EditorMode.EDITOR); }

document.querySelector('.overlay').addEventListener('click', (event) =>
{ if (event.target === event.currentTarget) TaskEditor.close(); });

function openTaskCard(id, mode)
{
    const task = TaskStore.getParsed().find(t => String(t.id) === String(id));
    if (!task) return;
    
    const bodyStr = task.bodyLines.join('\n');
    TaskEditor.open(id, task.title, bodyStr, task.dueDate, mode, task.color, task.status, task.archived);
}

function viewCard(id)
{ openTaskCard(id, EditorMode.VIEW); }

function taskEmptyText()
{
    const taskEmpty = document.querySelector('[data-task-empty]');
    if (!taskEmpty) return;

    const taskItems = document.getElementById('task-grid').querySelectorAll('[data-task]');
    
    if (taskItems.length > 0) taskEmpty.classList.add('none');
    else taskEmpty.classList.remove('none');
}

taskgrid.addEventListener('click', (event) =>
{
    const card = event.target.closest('.task-card');
    if (!card) return;
    const id = card.getAttribute('data-id');

    if (event.target.classList.contains('btn-delete'))
    {
        card.classList.add('animate-out');

        setTimeout(() =>
        {
            if (curGridViewMode === GridViewMode.ARCHIVE) TaskStore.remove(id);
            else
            {
                const task = TaskStore.getParsed().find(t => String(t.id) === String(id));
                if (task)
                {
                    let newMd = task.raw;
                    if (/^archived:/m.test(newMd)) newMd = newMd.replace(/^archived:.*$/m, `archived: true`);
                    else newMd = newMd.replace(/^---\n/, `---\narchived: true\n`);
                    newMd = newMd.replace(/^status:\s*archive.*$/m, 'status: new');
                    TaskStore.update(id, newMd);
                }
            }
            sortGrid();
        }, 300);
        return;
    }

    if (event.target.classList.contains('btn-edit'))
    {
        if (curGridViewMode === GridViewMode.ARCHIVE)
        {
            const task = TaskStore.getParsed().find(t => String(t.id) === String(id));
            if (task)
            {
                let newMd = task.raw;
                if (/^archived:/m.test(newMd)) newMd = newMd.replace(/^archived:.*$/m, `archived: false`);
                newMd = newMd.replace(/^status:\s*archive.*$/m, 'status: new');
                TaskStore.update(id, newMd);
                sortGrid();
            }
            return;
        }

        openTaskCard(id, EditorMode.EDITOR);
        return;
    }

    if(event.target.classList.contains('checkbox-card') || event.target.classList.contains('time-card')) return;
    viewCard(id);
});

taskgrid.addEventListener('change', (event) => {
    if (event.target.classList.contains('checkbox-card')) {
        const card = event.target.closest('.task-card');
        const id = card.getAttribute('data-id');
        const isChecked = event.target.checked;
        const newStatus = isChecked ? 'completed' : 'new';
        
        const task = TaskStore.getParsed().find(t => String(t.id) === String(id));
        if (!task) return;

        let newMd = task.raw;
        if (/^status:/m.test(newMd)) newMd = newMd.replace(/^status:.*$/m, `status: ${newStatus}`);
        else newMd = newMd.replace(/^---\n/, `---\nstatus: ${newStatus}\n`);
        
        TaskStore.update(id, newMd);
        setTimeout(() => sortGrid(), 400);
    }
});

let wasMobile = window.innerWidth <= 768;
window.addEventListener('resize', () =>
{
    if (curGridViewMode === GridViewMode.ALL_CALENDAR)
    {
        const isNowMobile = window.innerWidth <= 768;
        if (isNowMobile !== wasMobile)
        {
            wasMobile = isNowMobile;
            renderCalendarView();
        }
    }
});
