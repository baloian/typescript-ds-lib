import { Set } from '../lib/set';

describe('Set', () => {
  let set: Set<number>;

  beforeEach(() => {
    set = new Set<number>();
  });

  describe('Initialization', () => {
    test('should start empty', () => {
      expect(set.isEmpty()).toBe(true);
      expect(set.size()).toBe(0);
    });

    test('should handle invalid capacity', () => {
      const negativeSet = new Set<number>(-1);
      const zeroSet = new Set<number>(0);
      const largeSet = new Set<number>(1000000);

      expect(negativeSet.size()).toBe(0);
      expect(zeroSet.size()).toBe(0);
      expect(largeSet.size()).toBe(0);
    });
  });

  describe('Single Element Operations', () => {
    test('should insert elements correctly', () => {
      set.insert(1);
      expect(set.size()).toBe(1);
      expect(set.find(1)).toBe(true);

      // Duplicate insertion should not increase size
      set.insert(1);
      expect(set.size()).toBe(1);

      set.insert(2);
      expect(set.size()).toBe(2);
      expect(set.find(2)).toBe(true);

      // Test inserting many elements
      for (let i = 3; i <= 100; i++) {
        set.insert(i);
      }
      expect(set.size()).toBe(100);
    });

    test('should remove elements correctly', () => {
      set.insert(1);
      set.insert(2);
      set.insert(3);

      expect(set.remove(2)).toBe(true);
      expect(set.size()).toBe(2);
      expect(set.find(2)).toBe(false);
      expect(set.find(1)).toBe(true);
      expect(set.find(3)).toBe(true);

      // Removing non-existent element should return false
      expect(set.remove(4)).toBe(false);
      expect(set.size()).toBe(2);

      // Remove remaining elements
      expect(set.remove(1)).toBe(true);
      expect(set.remove(3)).toBe(true);
      expect(set.isEmpty()).toBe(true);

      // Try removing from empty set
      expect(set.remove(1)).toBe(false);
    });

    test('should find elements correctly', () => {
      // Empty set should not find any elements
      expect(set.find(1)).toBe(false);

      // Test finding elements after insertion
      set.insert(1);
      set.insert(2);
      set.insert(3);
      expect(set.find(1)).toBe(true);
      expect(set.find(2)).toBe(true);
      expect(set.find(3)).toBe(true);
      expect(set.find(4)).toBe(false);

      // Test finding after removal
      set.remove(2);
      expect(set.find(2)).toBe(false);

      // Test finding after clear
      set.clear();
      expect(set.find(1)).toBe(false);
      expect(set.find(2)).toBe(false);
      expect(set.find(3)).toBe(false);
    });

    test('should handle has() alias correctly', () => {
      set.insert(1);
      expect(set.has(1)).toBe(true);
      expect(set.has(2)).toBe(false);

      set.remove(1);
      expect(set.has(1)).toBe(false);
    });

    test('should handle delete() alias correctly', () => {
      set.insert(1);
      expect(set.remove(1)).toBe(true);
      expect(set.size()).toBe(0);
      expect(set.remove(1)).toBe(false);
    });
  });

  describe('Bulk Operations', () => {
    test('should clear all elements', () => {
      set.insert(1);
      set.insert(2);
      set.insert(3);

      set.clear();
      expect(set.isEmpty()).toBe(true);
      expect(set.size()).toBe(0);
      expect(set.find(1)).toBe(false);

      // Clear empty set
      set.clear();
      expect(set.isEmpty()).toBe(true);
    });

    test('should insert multiple elements with insertList', () => {
      const elements = [1, 2, 3, 4, 5];
      set.insertList(elements);

      expect(set.size()).toBe(elements.length);
      elements.forEach(el => {
        expect(set.find(el)).toBe(true);
      });

      // Insert another list
      const moreElements = [6, 7, 8];
      set.insertList(moreElements);
      expect(set.size()).toBe(elements.length + moreElements.length);
    });

    test('should handle duplicate elements in insertList', () => {
      const elements = [1, 1, 2, 2, 3];
      set.insertList(elements);

      expect(set.size()).toBe(3); // Only unique elements should be inserted
      expect(set.find(1)).toBe(true);
      expect(set.find(2)).toBe(true);
      expect(set.find(3)).toBe(true);

      // Add more duplicates
      set.insertList([1, 2, 3, 3, 3]);
      expect(set.size()).toBe(3);
    });

    test('should handle empty array in insertList', () => {
      set.insertList([]);
      expect(set.isEmpty()).toBe(true);
      expect(set.size()).toBe(0);

      // Add elements then empty array
      set.insert(1);
      set.insertList([]);
      expect(set.size()).toBe(1);
    });
  });

  describe('Iteration', () => {
    test('should iterate over elements with forEach', () => {
      const elements = [1, 2, 3, 4, 5];
      elements.forEach(el => set.insert(el));

      const result: number[] = [];
      set.forEach(value => result.push(value));

      expect(result.length).toBe(elements.length);
      expect(result.sort()).toEqual(elements.sort());

      // Test with callback that modifies external state
      let sum = 0;
      set.forEach(value => sum += value);
      expect(sum).toBe(15);
    });

    test('should handle forEach on empty set', () => {
      const result: number[] = [];
      set.forEach(value => result.push(value));
      expect(result).toEqual([]);

      // Test with callback that throws
      expect(() => {
        set.forEach(() => { throw new Error('Should not be called'); });
      }).not.toThrow();
    });
  });

  describe('Type Support', () => {
    test('should work with different data types', () => {
      const stringSet = new Set<string>();
      stringSet.insert('hello');
      stringSet.insert('world');

      expect(stringSet.size()).toBe(2);
      expect(stringSet.find('hello')).toBe(true);
      expect(stringSet.find('nonexistent')).toBe(false);

      // Test with empty string
      stringSet.insert('');
      expect(stringSet.find('')).toBe(true);

      // Test with special characters
      stringSet.insert('🚀');
      stringSet.insert('\n\t');
      expect(stringSet.find('🚀')).toBe(true);
      expect(stringSet.find('\n\t')).toBe(true);
    });

    test('should handle special values', () => {
      const mixedSet = new Set<any>();

      // Test null and undefined
      mixedSet.insert(null);
      mixedSet.insert(undefined);
      expect(mixedSet.size()).toBe(2);
      expect(mixedSet.find(null)).toBe(true);
      expect(mixedSet.find(undefined)).toBe(true);

      // Test NaN
      mixedSet.insert(NaN);
      expect(mixedSet.find(NaN)).toBe(true);

      // Test objects and arrays
      const obj = { a: 1 };
      const arr = [1, 2];
      mixedSet.insert(obj);
      mixedSet.insert(arr);
      expect(mixedSet.find(obj)).toBe(true);
      expect(mixedSet.find(arr)).toBe(true);
      expect(mixedSet.find({ a: 1 })).toBe(true); // Deep equality
      expect(mixedSet.find([1, 2])).toBe(true); // Deep equality

      // Test with Date objects
      const date = new Date();
      mixedSet.insert(date);
      expect(mixedSet.find(date)).toBe(true);
      expect(mixedSet.find(new Date(date))).toBe(true);

      // Test with RegExp
      const regex = /test/;
      mixedSet.insert(regex);
      expect(mixedSet.find(regex)).toBe(true);
      expect(mixedSet.find(/test/)).toBe(true);

      // Test with functions
      const fn = () => { };
      mixedSet.insert(fn);
      expect(mixedSet.find(fn)).toBe(true);
    });

    test('should handle objects with custom hash and equals methods', () => {
      const customSet = new Set<any>();

      const obj1 = {
        value: 42,
        hashCode: () => 42,
        equals: (other: any) => other.value === 42
      };

      const obj2 = {
        value: 42,
        hashCode: () => 42
      };

      customSet.insert(obj1);
      expect(customSet.find(obj2)).toBe(true);
    });
  });
});
