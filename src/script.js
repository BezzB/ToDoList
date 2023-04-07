import './style.css';

const addButton = document.querySelector('.addButton');
const inputValue = document.querySelector('.input');
const container = document.querySelector('.container');
const tasks = [
  {
    description: 'Buy groceries',
    completed: false,
    index: 0,
  },
  {
    description: 'Take out the trash',
    completed: true,
    index: 1,
  },
  {
    description: 'Walk the dog',
    completed: false,
    index: 2,
  },
  {
    description: 'Do laundry',
    completed: false,
    index: 3,
  },
];

class Item {
  constructor(itemName, index) {
    this.createDiv(itemName, index);
  }

  // eslint-disable-next-line no-unused-vars
  createDiv(itemName, index) {
    const input = document.createElement('input');
    input.value = itemName;
    input.disabled = true;
    input.classList.add('item_input');
    input.type = 'text';

    const itemBox = document.createElement('div');
    itemBox.classList.add('item');
    container.appendChild(itemBox);
    itemBox.appendChild(input);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('editButton');
    itemBox.appendChild(editButton);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Delete';
    removeButton.classList.add('removeButton');
    itemBox.appendChild(removeButton);

    editButton.addEventListener('click', () => this.edit(input));
    removeButton.addEventListener('click', () => this.remove(itemBox));
  }

  // eslint-disable-next-line class-methods-use-this
  edit(input) {
    input.disabled = !input.disabled;
  }

  // eslint-disable-next-line class-methods-use-this
  remove(itemBox) {
    container.removeChild(itemBox);
  }
}

// Iterate through the array of tasks and display them in the list
tasks.forEach((task) => {
  // eslint-disable-next-line no-new
  new Item(task.description, task.index);
});

addButton.addEventListener('click', () => {
  if (inputValue.value !== '') {
    const newTask = {
      description: inputValue.value,
      completed: false,
      index: tasks.length + 1,
    };
    tasks.push(newTask);
    // eslint-disable-next-line no-new
    new Item(newTask.description, newTask.index);
    inputValue.value = '';
  }
});
