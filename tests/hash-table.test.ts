import { HashTable } from '../lib/hash-table';

describe('HashTable', () => {
  let hashTable: HashTable<string, number>;

  beforeEach(() => {
    hashTable = new HashTable<string, number>();
  });

  test('should start empty', () => {
    expect(hashTable.isEmpty()).toBe(true);
    expect(hashTable.size()).toBe(0);
  });

  test('should insert and retrieve values', () => {
    hashTable.insert('one', 1);
    hashTable.insert('two', 2);
    hashTable.insert('three', 3);

    expect(hashTable.get('one')).toBe(1);
    expect(hashTable.get('two')).toBe(2);
    expect(hashTable.get('three')).toBe(3);
    expect(hashTable.size()).toBe(3);
  });

  test('should handle collisions', () => {
    // Force collisions by using a small capacity
    const smallTable = new HashTable<string, number>(2);
    smallTable.insert('a', 1);
    smallTable.insert('b', 2);
    smallTable.insert('c', 3);
    smallTable.insert('d', 4);

    expect(smallTable.get('a')).toBe(1);
    expect(smallTable.get('b')).toBe(2);
    expect(smallTable.get('c')).toBe(3);
    expect(smallTable.get('d')).toBe(4);
  });

  test('should update existing keys', () => {
    hashTable.insert('key', 1);
    expect(hashTable.get('key')).toBe(1);

    hashTable.insert('key', 2);
    expect(hashTable.get('key')).toBe(2);
    expect(hashTable.size()).toBe(1);
  });

  test('should remove elements', () => {
    hashTable.insert('one', 1);
    hashTable.insert('two', 2);

    expect(hashTable.remove('one')).toBe(true);
    expect(hashTable.get('one')).toBeUndefined();
    expect(hashTable.size()).toBe(1);

    expect(hashTable.remove('nonexistent')).toBe(false);
  });

  test('should clear the table', () => {
    hashTable.insert('one', 1);
    hashTable.insert('two', 2);
    hashTable.insert('three', 3);

    hashTable.clear();
    expect(hashTable.isEmpty()).toBe(true);
    expect(hashTable.size()).toBe(0);
    expect(hashTable.get('one')).toBeUndefined();
  });

  test('should handle different key types', () => {
    const mixedTable = new HashTable<any, string>();
    
    mixedTable.insert(42, 'number');
    mixedTable.insert(true, 'boolean');
    mixedTable.insert({ id: 1 }, 'object');
    mixedTable.insert([1, 2, 3], 'array');

    expect(mixedTable.get(42)).toBe('number');
    expect(mixedTable.get(true)).toBe('boolean');
    expect(mixedTable.get({ id: 1 })).toBe('object');
    expect(mixedTable.get([1, 2, 3])).toBe('array');
  });
});
