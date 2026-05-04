const currentLang = document.getElementById('current-lang');
const langList = document.getElementById('lang-list');

const translations = {
        ENG:{
            emailuser: "Not logged in",
            maintext: "MAIN",
            archivetext: "Archive",
            settingtext: "SETTING",
            settinguser: "Setting",
            darktheme: "Dark Mode",
            lighttheme: "Light Mode",
            accounttext: "ACCOUNT",
            aboutuser: "About",
            exituser: "Exit",
            addtask: "Add a task",
            tasktitle: "Task Title",       
            enterdesc: "Enter description...",
            savetask: "Save",
            canceltask: "Cancel",
            archivetask:"Archive",
            edittask: "Edit",
            untitled: "Untitled Task",
            nocontent: "No content",
            calendar:"Calendar",
            today: "Today",
            sorting: "Export all",
            addatask: "Add a task",
            edittask2:"Edit task",
            viewtask:"View task",
            hometext:"Home",
            donetask:"Done task",
            unarchive: "Unarchive",
            delete: "Delete"
        },
        UA:{
            emailuser: "Незареєстрований",
            maintext: "ГОЛОВНА",
            archivetext: "Архів",
            settingtext: "НАЛАШТУВАННЯ",
            settinguser: "Налаштування",
            darktheme: "Темна тема",
            lighttheme: "Світла тема",
            accounttext: "АККАУНТ",
            aboutuser: "Про нас",
            exituser: "Вихід",
            addtask: "Додати завдання",
            tasktitle: "Заголовок",       
            enterdesc: "Введіть опис...",
            savetask: "Зберегти",
            canceltask: "Скасувати",
            archivetask:"Архівувати",
            edittask: "Редагувати",
            untitled: "Без назви",
            nocontent: "Нічого немає",
            calendar:"Календар",
            today: "Сьогодні",
            sorting: "Експорт всіх завдань",
            addatask: "Додати завдання",
            edittask2:"Редагування завдання",
            viewtask:"Перегляд завдання",
            hometext:"Головна",
            donetask:"Виконані завдання",
            unarchive: "Розархівувати",
            delete: "Видалити"
        }
};



const languageSelecter= document.querySelector("select");

function deleteLang(selectedLang) {
    langList.querySelectorAll('li').forEach(li => {
        li.style.display = li.dataset.lang === selectedLang ? 'none' : 'block';
    });
}

deleteLang('ENG');

function applyLang(langCode) {
    const lang = translations[langCode];
    if (!lang) return;
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (lang[key]) el.innerText = lang[key];
    });

    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (lang[key]) {
            el.setAttribute('placeholder', lang[key]);
            el.setAttribute('data-placeholder', lang[key]);
        }
    });
}

applyLang('ENG'); 

const savedLang = localStorage.getItem('lang') || 'ENG';
applyLang(savedLang);
deleteLang(savedLang);

if (savedLang === 'UA') {
    currentLang.innerHTML = `<img src="img/ua_flag.png" class="icon-flag"> UA`;
} else {
    currentLang.innerHTML = `<img src="img/usa_flag.png" class="icon-flag"> ENG`;
}


currentLang.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    langList.style.display = langList.style.display === 'block' ? 'none' : 'block';
});

langList.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = li.dataset.lang;
        const src = li.dataset.src;
        currentLang.innerHTML = `<img src="${src}" class="icon-flag"> ${lang}`;
        langList.style.display = 'none';
        deleteLang(lang);
        applyLang(lang); 
        localStorage.setItem('lang', lang);
    });
});
 document.addEventListener('click', (e) => {
    if (!currentLang.contains(e.target) && !langList.contains(e.target)) {
        langList.style.display = 'none';
    }
});

function exitaccount() {
    localStorage.removeItem('tasks');
    window.location.href = "index.html";
}


$(".menu > ul > li").click(function (e) {
    $(this).siblings().removeClass("active");
    $(this).toggleClass("active");
    $(this).find("ul").slideToggle();
    $(this).siblings().find("ul").slideUp();
    $(this).siblings().find("ul").find("li").removeClass("active");
});

$(".menu-btn").click(function (){
    $(".left-panel").toggleClass("active");
});



let darkmode = localStorage.getItem('darkmode');

const enableDarkmode = () =>{
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active')

    document.getElementById('dark').style.display= 'none';
    document.getElementById('light').style.display= 'flex';
};

const disableDarkmode = () =>{
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null)

    document.getElementById('dark').style.display= 'flex';
    document.getElementById('light').style.display= 'none';
};

if (darkmode === 'active') {
    enableDarkmode();
}

document.getElementById('dark').addEventListener('click',(e)=>{
    e.preventDefault();
    darkmode = localStorage.getItem('darkmode');
    darkmode !== 'active' ? enableDarkmode() : disableDarkmode();
});

document.getElementById('light').addEventListener('click',(e)=>{
    e.preventDefault();
    disableDarkmode();
});

function addCardAbout()
{ document.querySelector('.about_div').classList.add('active'); }

function closeAbout()
{ document.querySelector('.about_div').classList.remove('active'); }
