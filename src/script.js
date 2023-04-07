import './style.css';

const addButton = document.querySelector('.addButton');
const inputValue = document.querySelector('.input');
const container = document.querySelector('.container');
const itemList = [];

class Item {
  constructor(itemName) {
    this.itemName = itemName;
    this.completed = false;
    this.createDiv(itemName);
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

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.classList.add('updateButton');
    itemBox.appendChild(updateButton);

    editButton.addEventListener('click', () => this.edit(input));
    removeButton.addEventListener('click', () => this.remove(itemBox));
    updateButton.addEventListener('click', () => this.update(input, itemName));
  }

  update(input, itemName) {
    this.itemName = input.value;
    itemList.splice(itemList.indexOf(itemName), 1, this.itemName);
    this.saveItems();
    input.disabled = true;
  }

  // eslint-disable-next-line class-methods-use-this
  edit(input) {
    input.disabled = false;
    input.focus();
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
    itemList.push(newItem.itemName);
    inputValue.value = '';
  }
});
