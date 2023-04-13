const Item = require('./app');

describe('Item class', () => {
  test('createDiv method should create a new item box with input, edit button, remove button, and checkbox elements', () => {
    // Arrange
    const itemName = 'Buy groceries';
    const completed = false;
    const item = new Item(itemName, completed);

    // Act
    item.createDiv();

    // Assert
    const itemBox = document.querySelector('.item');
    expect(itemBox).toBeDefined();

    const input = itemBox.querySelector('.item_input');
    expect(input).toBeDefined();
    expect(input.value).toBe(itemName);
    expect(input.disabled).toBe(true);

    const editButton = itemBox.querySelector('.editButton');
    expect(editButton).toBeDefined();
    expect(editButton.textContent).toBe('Edit');

    const removeButton = itemBox.querySelector('.removeButton');
    expect(removeButton).toBeDefined();
    expect(removeButton.textContent).toBe('Delete');

    const checkBox = itemBox.querySelector('.item_checkBox');
    expect(checkBox).toBeDefined();
    expect(checkBox.type).toBe('checkbox');
    expect(checkBox.checked).toBe(completed);
  });
});
