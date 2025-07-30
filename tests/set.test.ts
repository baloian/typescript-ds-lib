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

    test('should initialize with custom comparator', () => {
      const customSet = new Set<number>((a, b) => a > b);
      expect(customSet.isEmpty()).toBe(true);
      expect(customSet.size()).toBe(0);
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
      expect(set.find(1)).toBe(true);

      set.insert(2);
      expect(set.size()).toBe(2);
      expect(set.find(2)).toBe(true);

      // Test inserting many elements
      for (let i = 3; i <= 10; i++) {
        set.insert(i);
        expect(set.find(i)).toBe(true);
      }
      expect(set.size()).toBe(10);

      // Verify all elements are still findable
      for (let i = 1; i <= 10; i++) {
        expect(set.find(i)).toBe(true);
      }
    });

    test('should remove elements correctly', () => {
      set.insert(1);
      set.insert(2);
      set.insert(3);

      expect(set.remove(2));
      expect(set.size()).toBe(2);
      expect(set.find(2)).toBe(false);
      expect(set.find(1)).toBe(true);
      expect(set.find(3)).toBe(true);

      // Removing non-existent element should return false
      expect(set.remove(4));
      expect(set.size()).toBe(2);

      // Remove remaining elements
      expect(set.remove(1));
      expect(set.remove(3));
      expect(set.isEmpty()).toBe(true);

      // Try removing from empty set
      expect(set.remove(1));
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
      elements.forEach((el) => {
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
      elements.forEach((el) => set.insert(el));

      const result: number[] = [];
      set.forEach((value) => result.push(value));

      expect(result.length).toBe(elements.length);
      expect(result.sort()).toEqual(elements.sort());

      // Test with callback that modifies external state
      let sum = 0;
      set.forEach((value) => (sum += value));
      expect(sum).toBe(15);
    });

    test('should handle forEach on empty set', () => {
      const result: number[] = [];
      set.forEach((value) => result.push(value));
      expect(result).toEqual([]);

      // Test with callback that throws
      expect(() => {
        set.forEach(() => {
          throw new Error('Should not be called');
        });
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

    test('should work with custom comparator', () => {
      const reverseSet = new Set<number>((a, b) => a > b);
      reverseSet.insert(1);
      reverseSet.insert(2);
      reverseSet.insert(3);

      expect(reverseSet.size()).toBe(3);
      expect(reverseSet.find(2)).toBe(true);

      const result: number[] = [];
      reverseSet.forEach((value) => result.push(value));
      expect(result).toEqual([3, 2, 1]); // Should be in reverse order
    });
  });

  describe('Equality', () => {
    test('should consider empty sets equal', () => {
      const set1 = new Set<number>();
      const set2 = new Set<number>();
      expect(set1.equals(set2)).toBe(true);
    });

    test('should consider sets with same elements equal', () => {
      const set1 = new Set<number>();
      const set2 = new Set<number>();

      [1, 2, 3, 4, 5].forEach((n) => {
        set1.insert(n);
        set2.insert(n);
      });

      expect(set1.equals(set2)).toBe(true);
    });

    test('should consider sets with different elements unequal', () => {
      const set1 = new Set<number>();
      const set2 = new Set<number>();

      [1, 2, 3].forEach((n) => set1.insert(n));
      [1, 2, 4].forEach((n) => set2.insert(n));

      expect(set1.equals(set2)).toBe(false);
    });

    test('should consider sets with different sizes unequal', () => {
      const set1 = new Set<number>();
      const set2 = new Set<number>();

      [1, 2, 3].forEach((n) => set1.insert(n));
      [1, 2].forEach((n) => set2.insert(n));

      expect(set1.equals(set2)).toBe(false);
    });

    test('should handle equality with custom comparators', () => {
      const set1 = new Set<number>((a, b) => a > b);
      const set2 = new Set<number>((a, b) => a > b);

      [1, 2, 3].forEach((n) => {
        set1.insert(n);
        set2.insert(n);
      });

      expect(set1.equals(set2)).toBe(true);
    });
  });
});
