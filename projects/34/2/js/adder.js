const settingsIcon = document.querySelector(".settingsIcon");
const settings = document.querySelector(".settings");
const containerSettings = document.querySelector(".containerSetting");
const printContainet = document.querySelector("#print-container");
const defaultColorText = document.querySelector("#color-text");
const defaultBgColor = document.querySelector("#color");
const premerDiv = document.querySelector(".bg");
const printButton = document.getElementById("print-btn");
const imageInput = document.querySelector("#image-input");
const downloadButton = document.querySelector("#download");
const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
const spanTeach = document.querySelector(".span-teach");
const spanGroup = document.querySelector(".span-group");
const spanDate = document.querySelector(".span-date");
const spanTime = document.querySelector(".span-time");

let date = "";
let color = "";
let teach = "";
let agenda = "";
let time = "";
let grup = "";
let nameString = "";
let file;

imageInput.addEventListener("change", () => {
  file = imageInput.files[0];
  premerDiv.style.backgroundImage = `url(${URL.createObjectURL(
    imageInput.files[0]
  )})`;
  premerDiv.style.backgroundSize = "cover";
  premerDiv.style.backgroundPosition = "center";
});

downloadButton.classList.add("disp-none");
printButton.classList.add("disp-none");

settingsIcon.onclick = function () {
  settings.classList.toggle("activeMenu");
  containerSettings.classList.toggle("active");
};

document
  .querySelector("#date")
  .addEventListener("input", (e) => (date = e.target.value));
document
  .querySelector("#time")
  .addEventListener("input", (e) => (time = e.target.value));
document
  .querySelector("#teach")
  .addEventListener("input", (e) => (teach = e.target.value));
document
  .querySelector("#agenda")
  .addEventListener(
    "input",
    (e) => (agenda = e.target.value = e.target.value.slice(0, 85))
  );
document
  .querySelector("#color")
  .addEventListener("input", (e) => (color = e.target.value));
document
  .querySelector("#grup")
  .addEventListener(
    "input",
    (e) => (grup = e.target.value = e.target.value.slice(0, 2))
  );
document
  .querySelector("#surname")
  .addEventListener(
    "input",
    (e) => (nameString = e.target.value = e.target.value.slice(0, 1000))
  );

class CreateDocument {
  constructor() {
    this.createElement;
    this.ducumentBlock;
    this.imageUrl;
    this.arrDocumen = [];
  }
  createDocumentContainer() {
    this.ducumentBlock = document.createElement("div");
    this.ducumentBlock.classList.add("print-page");
    return this.ducumentBlock;
  }

  createStyleDocument() {
    this.createElement.style.background = defaultBgColor.value;
    this.createElement.style.color = defaultColorText.value;
    downloadButton.classList.remove("disp-none");
    printButton.classList.remove("disp-none");
  }

  createDocument(i) {
    this.createElement = this.createDocumentContainer();
    this.createElement.innerHTML = `<div class="xz"> 
                                      <div class= "containet-text-page"> 
                                        <p class="fontSize"> ${
                                          this.arrNames[i] &&
                                          `Шановний(-на) ${this.arrNames[i]}!`
                                        } Запрошуємо Вас на батьківські збори, що відбудуться ${date} о ${time}.</p>
                                        <p class="fontSize"> ${
                                          agenda &&
                                          agenda.length > 0 &&
                                          `Питання порядку денного зборів:
                                          <ol>
                                            ${agenda
                                              .split(";")
                                              .slice(0, 5)
                                              .filter(Boolean)
                                              .map(
                                                (item, index) =>
                                                  `<li class="fontSize">${
                                                    index + 1
                                                  }. ${item}</li>`
                                              )
                                              .join("")}
                                          </ol>`
                                        }</p>
                                        <div class="fontSize spaceBeet"><p class="m0 left">Керівник ${grup} групи</p><p class = 'right m0'> ${teach}</p>
                                        </div>
                                        </div>
                                        `;

    this.createStyleDocument();
    this.createElement.setAttribute("contenteditable", "true");
    if (file) {
      this.imageUrl = URL.createObjectURL(file);
      this.createElement.style.backgroundImage = `url(${this.imageUrl})`;
      this.createElement.style.backgroundSize = "cover";
      this.createElement.style.backgroundPosition = "center";
    }
    if (window.pageYOffset < 900) {
      window.scrollBy({
        top: 900,
        behavior: "smooth",
      });
    }
    return this.createElement;
  }
}

class GenerateDocument extends CreateDocument {
  constructor() {
    super();
    this.arrNames;
    this.arrDocument = [];
  }
  createDocumentContainer() {
    return super.createDocumentContainer();
  }
  validateInput() {
    if (teach.length == 0) {
      spanTeach.classList.add("error");
      alert("Введіть ПІБ керівника групи!");
      return false;
    }
    if (teach.length >= 40) {
      alert("ПІБ керівника групи повинно містити не більше 40 символів!");
      return false;
    }
    if (grup.length !== 2) {
      spanGroup.classList.add("error");
      alert("Номер групи повинен містити 2 символа!");
      return false;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      spanDate.classList.add("error");
      alert("Введіть дату!");
      return false;
    }
    if (!timeRegex.test(time)) {
      spanTime.classList.add("error");
      alert("Введіть час!");
      return false;
    }
    if (nameString.length > 1500) {
      alert("Прізвища батьків повинні містити не більше 1500 символів!");
      return false;
    }
    if (agenda.length > 85) {
      alert(
        "Перелік питань порядку денного повинний містити не більше 85 символів!"
      );
      return false;
    }
    if (agenda && agenda.split(';').length > 5) {
      alert('Пунктов не может быть более 5!');
      return false;
    }
    spanTeach.classList.remove("error");
    spanGroup.classList.remove("error");
    spanTime.classList.remove("error");
    spanDate.classList.remove("error");
    return true;
  }
  generate() {
    if (!this.validateInput()) {
      return [];
    }
    this.arrNames = nameString?.split(",").map((name) => name.trim());
    if (this.arrNames) {
      for (let i = 0; i < this.arrNames.length; i++) {
        this.arrDocument.unshift(this.createDocument(i));
      }
    }
    return this.arrDocument;
  }

  print() {
    let print_for = document.querySelectorAll(".print-page");
    let countPage = 0;
    for (let i = 0; i < print_for.length; i++) {
      print_for[i].classList.remove("page-break");
    }
    for (let i = 0; i < print_for.length; i++) {
      countPage++;
      if (countPage == 6) {
        print_for[i].classList.add("page-break");
        countPage = 0;
      }
    }
    window.print();
  }

  changeColor({ colorBg, colorText }) {
    premerDiv.style.background = colorBg;
    if (this.arrDocument.length !== 0) {
      for (let i = 0; i < this.arrDocument.length; i++) {
        this.arrDocument[i].style.color = colorText;
        this.arrDocument[i].style.background = colorBg;
      }
    }
  }

  download() {
    if (this.arrDocument.length !== 0) {
      for (let i = 0; i < this.arrDocument.length; i++) {
        html2canvas(this.arrDocument[i]).then((canvas) => {
          let image = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
          let downloadLink = document.createElement("a");
          downloadLink.href = image;
          downloadLink.download = `Батьківські збори.png`;
          downloadLink.click();
        });
      }
    }
  }

  changeImageBg(url) {
    for (let i = 0; i < this.arrDocument.length; i++) {
      this.arrDocument[i].style.backgroundImage = url;
      this.arrDocument[i].style.backgroundSize = "cover";
      this.arrDocument[i].style.backgroundPosition = "center";
    }
  }
}

const generateDocument = new GenerateDocument();

document.querySelector("#acceptButton").addEventListener("click", () => {
  let documents = generateDocument.generate();
  printContainet.prepend(...documents);
});

defaultBgColor.addEventListener("input", (e) => {
  generateDocument.changeColor({ colorBg: e.target.value });
});

defaultColorText.addEventListener("input", (e) => {
  generateDocument.changeColor({ colorText: e.target.value });
});

printButton.addEventListener("click", () => {
  generateDocument.print();
});

downloadButton.addEventListener("click", () => {
  generateDocument.download();
});

imageInput.addEventListener("change", () => {
  generateDocument.changeImageBg(
    `url(${URL.createObjectURL(imageInput.files[0])})`
  );
});

const addEventListeners = (selector, iconClass) => {
  const icon = document.querySelector(iconClass);
  const input = document.querySelector(selector);

  input.addEventListener("focus", () => {
    icon.classList.add("color-true");
  });

  input.addEventListener("blur", () => {
    icon.classList.remove("color-true");
  });

  input.addEventListener("input", () => {
    icon.classList.add("color-true-v");
  });
};

addEventListeners("#date", ".fa-calendar");
addEventListeners("#time", ".fa-clock-o");
