import { HashTable } from '../lib/hash-table';

describe('HashTable', () => {
  let hashTable: HashTable<string, number>;

  beforeEach(() => {
    hashTable = new HashTable<string, number>();
  });

  describe('Basic Operations', () => {
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

    test('should handle undefined and null values', () => {
      const nullTable = new HashTable<string, number | null | undefined>();
      nullTable.insert('null', null);
      nullTable.insert('undefined', undefined);

      expect(nullTable.get('null')).toBeNull();
      expect(nullTable.get('undefined')).toBeUndefined();
      expect(nullTable.size()).toBe(2);
    });

    test('should handle removing from empty bucket', () => {
      expect(hashTable.remove('nonexistent')).toBe(false);
      expect(hashTable.size()).toBe(0);
    });
  });

  describe('Collision Handling', () => {
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

    test('should handle removing elements with collisions', () => {
      const smallTable = new HashTable<string, number>(2);
      smallTable.insert('a', 1);
      smallTable.insert('b', 2);
      smallTable.insert('c', 3);

      expect(smallTable.remove('b')).toBe(true);
      expect(smallTable.get('a')).toBe(1);
      expect(smallTable.get('b')).toBeUndefined();
      expect(smallTable.get('c')).toBe(3);
    });

    test('should handle many collisions', () => {
      const tinyTable = new HashTable<number, string>(1);
      for (let i = 0; i < 100; i++) {
        tinyTable.insert(i, `value${i}`);
      }

      for (let i = 0; i < 100; i++) {
        expect(tinyTable.get(i)).toBe(`value${i}`);
      }
      expect(tinyTable.size()).toBe(100);
    });
  });

  describe('Key Type Support', () => {
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

    test('should handle keys with custom hashCode and equals methods', () => {
      class CustomKey {
        constructor(private id: number) { }

        hashCode(): number {
          return this.id;
        }

        equals(other: CustomKey): boolean {
          return this.id === other.id;
        }
      }

      const customTable = new HashTable<CustomKey, string>();
      const key1 = new CustomKey(1);
      const key2 = new CustomKey(2);
      const key1Duplicate = new CustomKey(1);

      customTable.insert(key1, 'first');
      customTable.insert(key2, 'second');

      expect(customTable.get(key1)).toBe('first');
      expect(customTable.get(key2)).toBe('second');
      expect(customTable.get(key1Duplicate)).toBe('first');

      expect(customTable.size()).toBe(2);
    });

    test('should handle Date objects as keys', () => {
      const dateTable = new HashTable<Date, string>();
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-01-01');
      const date3 = new Date('2023-12-31');

      dateTable.insert(date1, 'new year');
      dateTable.insert(date3, 'year end');

      expect(dateTable.get(date2)).toBe('new year');
      expect(dateTable.get(date3)).toBe('year end');
    });

    test('should handle Symbol keys', () => {
      const symbolTable = new HashTable<Symbol, string>();
      const sym1 = Symbol('test1');
      const sym2 = Symbol('test2');

      symbolTable.insert(sym1, 'value1');
      symbolTable.insert(sym2, 'value2');

      expect(symbolTable.get(sym1)).toBe('value1');
      expect(symbolTable.get(sym2)).toBe('value2');
      expect(symbolTable.get(Symbol('test1'))).toBeUndefined();
    });
  });

  describe('Edge Cases', () => {
    test('should handle zero capacity', () => {
      const zeroTable = new HashTable<string, number>(0);
      zeroTable.insert('test', 1);
      expect(zeroTable.get('test')).toBe(1);
    });

    test('should handle negative capacity', () => {
      const negativeTable = new HashTable<string, number>(-5);
      negativeTable.insert('test', 1);
      expect(negativeTable.get('test')).toBe(1);
    });

    test('should handle large numbers of operations', () => {
      const largeTable = new HashTable<number, number>();
      const operations = 10000;

      // Insert many items
      for (let i = 0; i < operations; i++) {
        largeTable.insert(i, i * 2);
      }

      // Verify all items
      for (let i = 0; i < operations; i++) {
        expect(largeTable.get(i)).toBe(i * 2);
      }

      expect(largeTable.size()).toBe(operations);
    });
  });
});
