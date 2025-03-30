// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

const ulElement = document.querySelector('ul');
const addItemModal = document.querySelector('dialog');
const addItemForm = addItemModal.querySelector('form');
const newItemName = addItemForm.querySelector('input');
const openModalBtn = document.querySelector('.add-btn');

todoList.forEach(todo => {
  const todoHTML = `
  <li>
    <input type="checkbox" id="${todo.id}" ${todo.completed ? 'checked' : ''}>
    <label for="${todo.id}">${todo.task}</label>
    <button class="delete-btn" data-id="${todo.id}">Delete</button>
  </li>
 `;

  ulElement.insertAdjacentHTML('beforeend', todoHTML);
});

ulElement.addEventListener('change', (event) => {
  if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
    const todoId = Number(event.target.id);
    const todo = todoList.find(item => item.id === todoId);
    if (todo) {
      todo.completed = event.target.checked;
      console.log(todoList);
    }
  }
});

ulElement.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const liElement = event.target.closest('li');
    ulElement.removeChild(liElement);
  }
});

openModalBtn.addEventListener('click', (event) => {
  addItemModal.showModal();
});

addItemForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newTask = newItemName.value.trim();
  if (newTask) {
    const newTodo = { id: Date.now(), task: newTask, completed: false };
    const todoHTML = `
    <li>
      <input type="checkbox" id="${newTodo.id}">
      <label for="${newTodo.id}">${newTodo.task}</label>
      <button class="delete-btn" data-id="${newTodo.id}">Delete</button>
    </li>
  `;
    ulElement.insertAdjacentHTML('beforeend', todoHTML);
    addItemModal.close();
    addItemForm.reset();
  }
});

