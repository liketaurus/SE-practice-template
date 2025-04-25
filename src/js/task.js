document.querySelectorAll('.tasks input[type="checkbox"]').forEach((checkbox, index) => {
  checkbox.addEventListener('change', () => {
    const task = checkbox.closest('.task');
    const output = document.getElementById('task-output');
    const path = document.getElementById('task-path');
    const startText = document.getElementById('start-text');

    if (startText) {
      startText.remove();
    }

    if (checkbox.checked) {
      task.classList.remove('hidden');
      task.classList.add('opened');
    } else {
      task.classList.remove('opened');
      task.classList.add('hidden');
    }

    const messages = [
      'Ви піднялись на другий поверх!',
      'Ви потрапили до правого крила коледжу!',
      'Вітаємо в аудиторії 221!'
    ];
    const paths = [
      'Перейдіть до правого крила за напрямком W',
      'Тепер знайдіть аудиторію 221 за напрямком SW',
    ];

    output.textContent = messages[index];
    path.textContent = paths[index];
  });
});