const TaskStore = (function()
{
    const KEY = 'tasks';
    let parsedCache = null;

    function save(tasks)
    { 
        localStorage.setItem(KEY, JSON.stringify(tasks));
        parsedCache = null;
        
        const user = window._firebaseAuth?.currentUser;
        if (!user)
        {
            return;
        }
        const { doc, setDoc } = window._firestoreFns;
        setDoc(doc(window._firebaseDb, "users", user.uid), { tasks }, { merge: true });
    }

    function getAll()
    { return JSON.parse(localStorage.getItem(KEY) || '[]'); }

    function getParsed() {
        if (!parsedCache) {
            parsedCache = getAll().map(md => {
                const parsed = TaskRenderer.parseFrontmatter(md);
                const lines = parsed.content.split('\n');
                return {
                    id: parsed.metadata.id,
                    status: parsed.metadata.status || 'new',
                    archived: parsed.metadata.archived || 'false',
                    dueDate: parsed.metadata.dueDate || '',
                    color: parsed.metadata.color || '#7A6ED6',
                    title: lines[0] ? lines[0].replace('# ', '') : 'Untitled',
                    bodyLines: lines.slice(1),
                    raw: md
                };
            });
        }
        return parsedCache;
    }

    function setAll(tasksArray) 
    { save(tasksArray); }



    function add(mdString)
    {
        const tasks = getAll();
        tasks.push(mdString);
        save(tasks);
    }

    function findTaskIndex(tasks, id)
    { return tasks.findIndex(task => task.includes(`id: ${id}`)); }

    function remove(id)
    {
        const tasks = getAll();
        const index = findTaskIndex(tasks, id);
        if (index === -1) return;
        tasks.splice(index, 1);
        save(tasks);
    }

    function update(id, mdString)
    {
        const tasks = getAll();
        const index = findTaskIndex(tasks, id);
        if (index === -1) return;
        tasks[index] = mdString;
        save(tasks);
    }

    return { getAll, getParsed, setAll, add, remove, update };
})();

function exportAllTasks()
{
    const tasks = TaskStore.getAll();
    if (tasks.length === 0) return alert('No tasks to export.');

    tasks.forEach(mdString => {
        const idMatch = mdString.match(/^id:\s*(.+)$/m);
        const id = idMatch ? idMatch[1].trim() : Date.now();

        const blob = new Blob([mdString], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a  = document.createElement('a');
        a.href = url;
        a.download = `task-${id}.md`;
        a.click();
        URL.revokeObjectURL(url);
    });
}