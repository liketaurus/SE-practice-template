function showModalText(message) {
    // Создание элементов
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex'; // Показать модалку
  
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.backgroundColor = '#111';
    modalContent.style.padding = '30px';
    modalContent.style.color = '#0ff';
    modalContent.style.position = 'relative';
    modalContent.style.textAlign = 'center';

    const closeButton = document.createElement('span');
    closeButton.className = 'close';
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';        
    closeButton.style.right = '5px';       
    closeButton.style.fontSize = '30px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#0ff';
    closeButton.onclick = () => document.body.removeChild(modal);
  
    const text = document.createElement('p');
    text.innerText = message;
  
    // Сборка элементов
    modalContent.appendChild(closeButton);
    modalContent.appendChild(text);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

const startBtnM = document.querySelector(".start-btn");
startBtnM.addEventListener("click", showModalText("Відмічайте виконані завдання внизу!"));