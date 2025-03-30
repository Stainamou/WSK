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

  const todoHTML = `
  <li>
    <input type="checkbox" id="${todo.id}" ${todo.completed ? 'checked' : ''}>
    <label for="${todo.id}">${todo.task}</label>
</li>
`;

  ulElement.insertAdjacentHTML('beforeend', todoHTML);
})
