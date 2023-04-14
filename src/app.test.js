import { Item } from './script.js';

describe('Item class', () => {
  let container;

  beforeEach(() => {
    // create a div element to use as the container
    container = document.createElement('div');
    container.classList.add('container');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // remove the container after each test
    container.remove();
  });

  test('should add item to list', () => {
    // create a new item and add it to the container
    const itemName = 'Test Item';
    new Item(itemName);
    const itemDiv = container.querySelector('.item');

    // assert that the item is added to the container and has the correct name
    expect(itemDiv).not.toBeNull();
    expect(itemDiv.querySelector('.item_input').value).toBe(itemName);
  });

  test('should remove item from list', () => {
    // create a new item and add it to the container
    const itemName = 'Test Item';
    const item = new Item(itemName);
    const itemDiv = container.querySelector('.item');
    const removeButton = itemDiv.querySelector('.removeButton');

    // click the remove button to remove the item
    removeButton.click();

    // assert that the item is removed from the container and the itemList array
    expect(container.querySelector('.item')).toBeNull();
    expect(itemList).not.toContain(item);
  });
});
