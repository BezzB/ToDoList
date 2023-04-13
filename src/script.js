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
    this.createDiv();
    itemList.push(this);
    this.saveItems();
  }

  createDiv() {
    const itemBox = document.createElement('div');
    itemBox.classList.add('item');
    container.appendChild(itemBox);

    const input = this.createInput();
    itemBox.appendChild(input);

    const editButton = this.createButton('Edit', 'editButton', () => this.edit(input));
    itemBox.appendChild(editButton);

    const removeButton = this.createButton('Delete', 'removeButton', () => this.remove(itemBox));
    itemBox.appendChild(removeButton);

    const checkBox = this.createCheckbox();
    itemBox.appendChild(checkBox);

    checkBox.addEventListener('change', () => this.updateStatus(checkBox.checked));
  }

  createInput() {
    const input = document.createElement('input');
    input.value = this.itemName;
    input.disabled = true;
    input.classList.add('item_input');
    input.type = 'text';
    return input;
  }

  createButton(text, className, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(className);
    button.addEventListener('click', onClick);
    return button;
  }

  createCheckbox() {
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = this.completed;
    checkBox.classList.add('item_checkBox');
    return checkBox;
  }

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

  saveItems() {
    localStorage.setItem('itemList', JSON.stringify(itemList));
  }
}

if (localStorage.getItem('itemList')) {
  const storedItems = JSON.parse(localStorage.getItem('itemList'));
  storedItems.forEach((item) => new Item(item.itemName, item.completed));
}

addButton.addEventListener('click', () => {
  if (inputValue.value !== '') {
    new Item(inputValue.value);
    inputValue.value = '';
  }
});

clearButton.addEventListener('click', () => {
  itemList = itemList.filter((item) => !item.completed);
  container.innerHTML = '';
  itemList.forEach((item) => {
    item.updateStatus(item.completed);
    item.createDiv();
  });
  localStorage.setItem('itemList', JSON.stringify(itemList));
});
