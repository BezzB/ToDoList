import './style.css';

const addButton = document.querySelector('.addButton');
const inputValue = document.querySelector('.input');
const container = document.querySelector('.container');

class Item {
  constructor(itemName) {
    this.createDiv(itemName);
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

  edit(input) {
    input.disabled = !input.disabled;
  }

  remove(itemBox) {
    container.removeChild(itemBox);
  }
}

addButton.addEventListener('click', () => {
  if (inputValue.value !== '') {
    // eslint-disable-next-line no-new
    new Item(inputValue.value);
    inputValue.value = '';
  }
});
