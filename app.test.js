import { Item } from './src/script.js';

const { describe, test, expect } = require('@jest/globals');

describe('Item', () => {
  test('createDiv() method should return a string of HTML code', () => {
    const item = new Item({
      image: 'path/to/image',
      imageHover: 'path/to/hover/image',
      name: 'Item Name',
      description: 'Item description',
      technologies: ['tech1', 'tech2', 'tech3'],
      live: 'https://live-url.com',
      source: 'https://source-url.com',
    });
    const result = item.createDiv();
    expect(typeof result).toBe('string');
    expect(result).toMatch(/<div.*>.*<\/div>/s);
  });
});
