const form = document.querySelector('#newTaskForm'),
    taskList = document.querySelector('#list-group'),
    input = document.querySelector('#addNewTask');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let taskText = input.value.trim();
    // формируем разметку для новой задачи
    const taskHTML = `
        <li class="list-group-item d-flex justify-content-between">
            <span contenteditable="true" class="task-title">${taskText}</span>
            <div>
                <button type="button" data-action="ready"class="btn btn-light align-self-end">Готово</button>
                <button type="button" data-action="delete-task"class="btn btn-light align-self-end">Удалить</button>
            </div>
        </li>
    `;

    // добавляем новую задачу на страницу
    taskList.insertAdjacentHTML('afterbegin', taskHTML);

    // очищаем поле добавления этой задачи
    input.value = '';
    input.focus();
    // скрываем запись о том, что список задач пуст
    toggleEmptyListItem();
    // показ нотификации задача добавлена
    showNotification('new');


});

taskList.addEventListener('click', function (event) {
    // проверяем, что клик произошел по кнопке "удалить"
    if (event.target.getAttribute('data-action') === 'delete-task') {
        // находим родительский элемент <li> и удаляем его
        event.target.closest('.list-group-item').remove();
        // скрываем или показываем запись о том, что список дел пуст
        toggleEmptyListItem();

        // показываем нотификацию, задача удалена
        showNotification('delete');

    } else if (event.target.getAttribute('data-action') === 'ready') {
        // если происходит клик по кнопке "готово", задача отмечается выполненной
        const parentElement = event.target.closest('.list-group-item');
        // добавляем класс "готово" к выполненной задаче
        parentElement.querySelector('.task-title').classList.add('task-title--done');
        // удаляет аттрибут condenteditable (возможность редактировать текст в span)
        parentElement.querySelector('.task-title').setAttribute('contenteditable', 'false');
        // перемещаем запись в конец списка
        taskList.insertAdjacentElement('beforeend', parentElement);
        // удаляем кнопку готово
        event.target.remove();
        // нотификация задача готова
        showNotification('ready');


    }

});

function toggleEmptyListItem() {
    if (taskList.children.length > 1) {
        document.querySelector('#empty-list-item').style.display = 'none';
    } else {
        document.querySelector('#empty-list-item').style.display = 'block';
    }
};

function showNotification(type) {
    let newElement = document.createElement('div');

    switch (type) {
        case 'new':
            newElement.className = 'alert alert-warning';
            newElement.textContent = 'Задача добавлена!';
            break;
        case 'delete':
            newElement.className = 'alert alert-danger';
            newElement.textContent = 'Задача удалена!';
            break;
        case 'ready':
            newElement.className = 'alert alert-primary';
            newElement.textContent = 'Задача выполнена!';
            break;
    }


    document.querySelector('#notifyHolder').insertAdjacentElement('afterbegin', newElement);

    setTimeout(function () {
        newElement.style.opacity = "1";
    }, 300);
    setTimeout(function () {
        newElement.style.opacity = "0";
    }, 2300);
    setTimeout(function () {
        newElement.remove();
    }, 2600);
};