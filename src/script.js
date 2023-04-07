import './style.css';

const addButton = document.querySelector('.addButton');
const inputValue = document.querySelector('.input');
const container = document.querySelector('.container');
const itemList = [];

class Item {
  constructor(itemName) {
    this.itemName = itemName;
    this.createDiv(itemName);
    itemList.push(this.itemName);
    this.saveItems();
  }

  createDiv(itemName) {
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

  remove(itemBox) {
    container.removeChild(itemBox);
    const index = itemList.indexOf(this.itemName);
    if (index > -1) {
      itemList.splice(index, 1);
      this.saveItems();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  saveItems() {
    localStorage.setItem('itemList', JSON.stringify(itemList));
  }
}

// Check if items are stored in local storage
if (localStorage.getItem('itemList')) {
  const storedItems = JSON.parse(localStorage.getItem('itemList'));
  storedItems.forEach((item) => {
    // eslint-disable-next-line no-new
    new Item(item);
  });
}

addButton.addEventListener('click', () => {
  if (inputValue.value !== '') {
    const newItem = new Item(inputValue.value);
    itemList.push(newItem);
    /* eslint-disable no-console */
    console.log(`The updated length of itemList is ${itemList.length}`);
    inputValue.value = '';
  }
});
