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

todoList.forEach(todo => {
  const liElement = document.createElement('li');
  const inputElement = document.createElement('input');
  const labelElement = document.createElement('label');

  inputElement.type = 'checkbox';
  inputElement.id = todo.id;
  inputElement.checked = todo.completed;

  labelElement.htmlFor = todo.id;
  labelElement.textContent = todo.task;

  liElement.appendChild(inputElement);
  liElement.appendChild(labelElement);
  ulElement.appendChild(liElement);
});
