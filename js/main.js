"use strict"
// Находим элементы на станице
const form = document.querySelector('#form');

const taskInput = document.querySelector('#taskInput');

const tasksList = document.querySelector('#tasksList');

const emptyList = document.querySelector('#emptyList');

let tasks = [];
checkEmptyList();


// Добавление задачи
form.addEventListener('submit', addTask);

// Удаление задачи
tasksList.addEventListener('click', deleteTask);

// Отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask);

// Функции
function addTask(event) {
    // Отменяем отправку формы
    event.preventDefault();

    // Достаем текст из поля ввода
    const taskText = taskInput.value

    // Описываем задачу в виде объекта
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }

    // Добавляем задачу в массив с задачами
    tasks.push(newTask);

    // Формируем CSS класс 
    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';

    // Формируем разметку для новой задачи
    const taskHTML = `
    <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
        <span class= "${cssClass}">${newTask.text}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
             <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
         </div>
    </li>`;

    // Добовляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    // Очищаем поле ввода возвращаем на него фокус
    taskInput.value = '';

    taskInput.focus();

    checkEmptyList();

}

function deleteTask(event) {

    // Проверяем что клик был не кнопке "Удалить задачу"
    if (event.target.dataset.action !== 'delete') return;

    const parenNode = event.target.closest('.list-group-item');

    // Определяем ID задачи
    const id = Number(parenNode.id);

    // Находим индекс задачи в массиве
    const index = tasks.findIndex((task) => task.id === id);

    // Удаляем задачу из массива
    tasks.splice(index, 1);

    /* 
    // Второй ввариант: Удаляем задачу через фильтр
    tasks = tasks.filter((tasks)=> task.id !==id);
    */

    // Удаляем задачу из разметки
    parenNode.remove();

    checkEmptyList();

}

function doneTask(event) {
    // Проверяем что клик был НЕ по кнопке "Выполненно"
    if (event.target.dataset.action !== 'done') return;
    const parenNode = event.target.closest('.list-group-item');

    // Определяем ID Задачи
    const id = Number(parenNode.id);
    const task = tasks.find((task) => task.id === id);
    task.done = !task.done;

    const taskTitle = parenNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done')

}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListElement = `
            <li id="emptyList" class="list-group-item empty-list">
			    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
			    <div class="empty-list__title">Список дел пуст</div>
		    </li>`;
        tasksList.insertAdjacentHTML('afterbegin', emptyListElement);
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;

    }

}

