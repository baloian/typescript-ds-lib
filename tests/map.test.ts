import { Map } from '../lib/map';

describe('Map', () => {
  let map: Map<string, number>;

  beforeEach(() => {
    map = new Map<string, number>();
  });

  test('should start empty', () => {
    expect(map.empty()).toBe(true);
    expect(map.size()).toBe(0);
  });

  test('should insert and find key-value pairs correctly', () => {
    map.insert('one', 1);
    map.insert('two', 2);
    map.insert('three', 3);

    expect(map.empty()).toBe(false);
    expect(map.size()).toBe(3);
    expect(map.find('one')).toBe(1);
    expect(map.find('two')).toBe(2);
    expect(map.find('three')).toBe(3);
    expect(map.find('four')).toBeUndefined();
  });

  test('should handle duplicate keys by updating values', () => {
    map.insert('test', 1);
    map.insert('test', 2);
    map.insert('test', 3);

    expect(map.size()).toBe(1);
    expect(map.find('test')).toBe(3);
  });

  test('should delete key-value pairs correctly', () => {
    map.insert('one', 1);
    map.insert('two', 2);
    map.insert('three', 3);

    expect(map.size()).toBe(3);

    map.delete('two');
    expect(map.find('two')).toBeUndefined();
    expect(map.size()).toBe(2);

    map.delete('one');
    expect(map.find('one')).toBeUndefined();
    expect(map.size()).toBe(1);
  });

  test('should handle deleting non-existent keys', () => {
    map.insert('one', 1);
    map.insert('two', 2);
    
    const initialSize = map.size();
    map.delete('three');
    
    expect(map.size()).toBe(initialSize);
  });

  test('should clear all entries', () => {
    map.insert('one', 1);
    map.insert('two', 2);
    map.insert('three', 3);

    expect(map.empty()).toBe(false);
    
    map.clear();
    
    expect(map.empty()).toBe(true);
    expect(map.size()).toBe(0);
  });
});
