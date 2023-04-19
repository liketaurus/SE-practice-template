
$(".single-item").slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
});

class Course {
    constructor() {
        this.title = document.getElementById('title').value.trim();
        this.duration = document.getElementById('duration').value.trim();
    }
}

class Teacher {
    constructor() {
        this.name = document.getElementById('surname-teacher').value.trim();
    }
}

class Participants {
    constructor() {

        this.names = [];
        $('#students-list input').each((key, input) => {
            this.names.push(input.value.trim());
        });
    }
}

class Certificate {
    constructor() {
        this.dateOfIssue = new Date().toLocaleDateString('en-GB');
    }
}

class studentsCount{
    constructor(){
        this.count = document.getElementById('students-count').value.trim();
    }
}

function chooseTemplate(event) {
    const selectedImage = document.querySelector('#temp .selected-image');
    const containerPreview = document.getElementById("container-preview");

    if (event.target.tagName === 'IMG') {
        const imgPath = '';
        const src = imgPath + event.target.dataset.src;
        selectedImage.innerHTML = `<img src="${src}" />`;
        document.querySelector("#temp .template").className = `${event.target.dataset.class} template`;
        containerPreview.classList.add("visible");

        showList();
    }
}

function generateCertificate() {
    const course = new Course();
    const teacher = new Teacher();
    const participants = new Participants();
    const certificate = new Certificate();
    const studentCount = new studentsCount();

    if (course.title === "" || course.duration === "" || teacher.name === "" || participants.names?.length === 0 || studentCount.count === "" ) {
        console.log(course.title, course.duration, teacher.name, participants.names?.length, studentCount.count)
        alert("Будь ласка, заповніть всі поля");
        return;
    }

    const regex = /^[a-zA-Zа-яА-ЯІіЇїЄєҐґ'.\s,-]+$/;
     if (!regex.test(teacher.name) || !regex.test(participants.names)) {
         alert("Поля вводу прізвища та ініціалів можуть містити лише літери, пробіли, апостроф і деякі розділові знаки");
         return;
     }

     const regexNum = /^[a-zA-Zа-яА-Я0-9\s]+$/;
     if (!regexNum.test(course.duration)) {
         alert("В тривалість вводьте тільки число та букви. Наприклад: 1 год");
         return;
     }

     if (!participants.names.every(name => name)) {
         alert("Поля з учасниками повинні всі бути заповненні");
         return;
     }


    if (studentCount.count < 1) {
        alert("Мінімальна кількість студентів повинна бути 1");
        return;
    }

    document.getElementsByClassName("title-temp")[0].innerText = course.title;
    document.getElementsByClassName("teacher-temp")[0].innerText = teacher.name;
    document.getElementsByClassName("date-temp")[0].innerText = certificate.dateOfIssue;
    document.getElementsByClassName("duration-temp")[0].innerText = course.duration;

    showList();
    alert("Дані записано, оберіть шаблон, якщо ще цього не зробили")
}

function showList () {
    const participants = new Participants();

    const html = $($('#temp').html());
    const target = $('#template');
    target.html('');

    participants.names.forEach((participant) => {
        html.find('.student-temp').text(participant);
        target.append(html.clone());
    });


}

function printCertificate() {
    const course = new Course();
    const teacher = new Teacher();
    const participants = new Participants();

    if (course.title === "" || course.duration === "" || teacher.name === "" || participants.names?.length === "") {
        alert("Будь ласка, спочатку заповніть всі поля форми");
        return;
    }

    document.getElementById("print-box").innerHTML = document.getElementById("container-preview").innerHTML;
    document.getElementById("main").classList.add("hidden");
    document.getElementById("print-box").classList.remove("hidden");

    document.querySelector('#print-box .selected-image img').addEventListener('load', () => {
        window.print();

        document.getElementById("main").classList.remove("hidden");
        document.getElementById("print-box").classList.add("hidden");
    })

}

function downloadCertificate() {

    const course = new Course();
    const teacher = new Teacher();
    const participants = new Participants();

    if (course.title === "" || course.duration === "" || teacher.name === "" || participants.names?.length === "") {
        alert("Будь ласка, спочатку заповніть всі поля форми");
        return;
    }
    window.jsPDF = window.jspdf.jsPDF;


    let docPDF = new jsPDF({
        orientation: 'landscape',
    });

    docPDF.addFileToVFS("Roboto.ttf", Roboto);
    docPDF.addFont("Roboto.ttf", "Roboto", "normal");
    docPDF.setFont("Roboto");

    let elementHTML = document.querySelector("#template").cloneNode(true);
    elementHTML.style = 'width: 600px';
    elementHTML.classList.add("print-to-pdf");
    docPDF.html(elementHTML, {
        callback: function(docPDF) {
            docPDF.save('certificate.pdf');
        },
        margin: [26.4, 0, 26.4, 0],
        html2canvas: {
            allowTaint: true,
            dpi: 200,
            letterRendering: true,
            logging: false,
            scale: .5
        }
    });
}

$("#students-count").on('change keyup', (event) => {
    $('#students-list').html('');

    let el = document.querySelector(".col-form-label.hidden");
    if (el?.classList) {
        el.classList.remove("hidden");
    }

    const elem = $('#surname-student').clone().removeClass('hidden').addClass('surname-student');
    for(let i = 0; i < event.target.value; i++) {
        elem.clone().attr('id', `surname-student-${(i+1)}`).appendTo('#students-list');
    }
})

$("#temp").on('change keyup', (event) => {
    $('#template').html('#temp');
    const element = $('#temp').clone().removeClass('hidden').addClass('surname-student');
    for(let i = 0; i < event.target.value; i++) {
        element.clone().attr('id', `temp-${(i+1)}`).appendTo('#template')
    }
})

