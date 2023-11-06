document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskText = document.getElementById('task-text').value;
    if (taskText.trim() === '') {
        return;
    }

    const task = {
        text: taskText,
        state: 'To Do',
    };

    saveTask(task);
    document.getElementById('task-text').value = '';
    loadTasks();
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const todoList = document.getElementById('todo-list');
    const doingList = document.getElementById('doing-list');
    const doneList = document.getElementById('done-list');

    todoList.innerHTML = '';
    doingList.innerHTML = '';
    doneList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.innerHTML = `
            <p>${task.text}</p>
            <button onclick="moveTask('${task.text}', 'up')">↑</button>
            <button onclick="moveTask('${task.text}', 'down')">↓</button>
            <button onclick="deleteTask('${task.text}')">X</button>
        `;

        if (task.state === 'To Do') {
            todoList.appendChild(taskCard);
        } else if (task.state === 'Doing') {
            doingList.appendChild(taskCard);
        } else if (task.state === 'Done') {
            doneList.appendChild(taskCard);
        }
    });
}

function moveTask(taskText, direction) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        if (task.text === taskText) {
            if (direction === 'up') {
                if (task.state === 'To Do') task.state = 'Doing';
                else if (task.state === 'Doing') task.state = 'Done';
            } else if (direction === 'down') {
                if (task.state === 'Done') task.state = 'Doing';
                else if (task.state === 'Doing') task.state = 'To Do';
            }
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    loadTasks();
}
