/* app.js */
import tasks from './tasks.js';

export function addTask(tasks, description) {
  const task = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function deleteTask(index) {
  tasks.splice(index, 1);
  // Update the indexes of the remaining tasks
  tasks.forEach((task, i) => {
    task.index = i + 1;
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/* index.js */
import tasks from './tasks.js';
import './style.css';
import './storage.js';
import { addTask, deleteTask } from './app.js';
import { updateStatus, clearCompleted } from './update.js';

let tastList = tasks;
export default function renderTasks() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = ''; // clear previous items
  tastList.sort((a, b) => a.index - b.index);
  tastList.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML += `<input class='checkbox' type="checkbox" ${task.completed ? 'checked' : ''}/><p>${task.description}</p> <div class="icons"> <i class="fa tri-dots">&#xf142;</i>
    <i class="fa fa-trash-o trash"></i></div>`;
    taskItem.querySelector('input').addEventListener('change', (event) => {
      updateStatus(tastList, index, event.target.checked);
      renderTasks();
    });
    taskItem.querySelector('p').addEventListener('click', function editTask() {
      const descriptionElement = this;
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = descriptionElement.innerText;
      editInput.addEventListener('blur', () => {
        tastList[index].description = editInput.value;
        localStorage.setItem('tastList', JSON.stringify(tastList));
        renderTasks();
      });
      descriptionElement.replaceWith(editInput);
      editInput.focus();
    });

    taskItem.querySelector('div').addEventListener('click', () => {
      deleteTask(index);
      renderTasks();
    });

    if (task.completed) {
      taskItem.classList.add('completed');
    }

    todoList.appendChild(taskItem);
  });
}

const newTaskForm = document.querySelector('form');
newTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newTaskInput = document.querySelector('.new-task-input');
  addTask(tastList, newTaskInput.value);
  renderTasks();
  newTaskInput.value = '';
});

const clearCompletedBtn = document.querySelector('.clear-completed-btn');
clearCompletedBtn.addEventListener('click', () => {
  tastList = clearCompleted(tastList);
  renderTasks();
});
renderTasks();

/* Storage.js */
const typedTodo = document.querySelector('.new-task-input');
const todos = document.querySelector('form');
const todoData = JSON.parse(localStorage.getItem('todoData')) || { todo: '' }; // Initialize todoData with an empty todo property
const savedData = JSON.parse(localStorage.getItem('todoData'));
if (savedData) {
  typedTodo.value = savedData.todo;
}

todos.addEventListener('input', (event) => {
  if (event.target.id === typedTodo.id) {
    todoData.todo = event.target.value;
  }
  localStorage.setItem('todoData', JSON.stringify(todoData));
});

todos.addEventListener('submit', () => {
  todoData.todo = '';
  localStorage.setItem('todoData', JSON.stringify(todoData));
});

/* tasks.js */
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
export default tasks;

/* update.js */

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
export default tasks;
