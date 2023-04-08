import './style.css';

const addButton = document.querySelector('.addButton');
const inputValue = document.querySelector('.input');
const container = document.querySelector('.container');
const clearButton = document.querySelector('.clearButton');
let itemList = [];

class Item {
  constructor(itemName, completed = false) {
    this.itemName = itemName;
    this.completed = completed;
    this.createDiv(itemName, completed);
    itemList.push(this);
    this.saveItems();
  }

  createDiv(itemName, completed) {
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

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = completed;
    checkBox.classList.add('item_checkBox');
    itemBox.appendChild(checkBox);

    editButton.addEventListener('click', () => this.edit(input));
    removeButton.addEventListener('click', () => this.remove(itemBox));
    checkBox.addEventListener('change', () => this.updateStatus(checkBox.checked));
  }

  // eslint-disable-next-line class-methods-use-this
  edit(input) {
    input.disabled = !input.disabled;
  }

  remove(itemBox) {
    container.removeChild(itemBox);
    const index = itemList.indexOf(this);
    if (index > -1) {
      itemList.splice(index, 1);
      this.saveItems();
    }
  }

  updateStatus(completed) {
    this.completed = completed;
    this.saveItems();
  }

  // eslint-disable-next-line class-methods-use-this
  saveItems() {
    localStorage.setItem('itemList', JSON.stringify(itemList));
  }
}

if (localStorage.getItem('itemList')) {
  const storedItems = JSON.parse(localStorage.getItem('itemList'));
  storedItems.forEach((item) => {
    // eslint-disable-next-line no-new
    new Item(item.itemName, item.completed);
  });
}

addButton.addEventListener('click', () => {
  if (inputValue.value !== '') {
    // eslint-disable-next-line no-new
    new Item(inputValue.value);
    inputValue.value = '';
  }
});

clearButton.addEventListener('click', () => {
  itemList = itemList.filter((item) => !item.completed);
  container.innerHTML = '';
  itemList.forEach((item) => {
    // eslint-disable-next-line no-new
    new Item(item.itemName, item.completed);
  });
  localStorage.setItem('itemList', JSON.stringify(itemList));
});
