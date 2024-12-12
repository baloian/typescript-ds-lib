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
    });

    test('should remove elements correctly', () => {
      set.insert(1);
      set.insert(2);
      set.insert(3);

      set.remove(2);
      expect(set.size()).toBe(2);
      expect(set.find(2)).toBe(false);
      expect(set.find(1)).toBe(true);
      expect(set.find(3)).toBe(true);

      // Removing non-existent element should not affect set
      set.remove(4);
      expect(set.size()).toBe(2);
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
    });

    test('should insert multiple elements with insertList', () => {
      const elements = [1, 2, 3, 4, 5];
      set.insertList(elements);

      expect(set.size()).toBe(elements.length);
      elements.forEach(el => {
        expect(set.find(el)).toBe(true);
      });
    });

    test('should handle duplicate elements in insertList', () => {
      const elements = [1, 1, 2, 2, 3];
      set.insertList(elements);

      expect(set.size()).toBe(3); // Only unique elements should be inserted
      expect(set.find(1)).toBe(true);
      expect(set.find(2)).toBe(true);
      expect(set.find(3)).toBe(true);
    });

    test('should handle empty array in insertList', () => {
      set.insertList([]);
      expect(set.isEmpty()).toBe(true);
      expect(set.size()).toBe(0);
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
    });

    test('should handle forEach on empty set', () => {
      const result: number[] = [];
      set.forEach(value => result.push(value));
      expect(result).toEqual([]);
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
    });
  });
});
