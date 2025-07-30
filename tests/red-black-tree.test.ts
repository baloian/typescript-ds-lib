import { RedBlackTree } from '../lib/red-black-tree';

describe('RedBlackTree', () => {
  let tree: RedBlackTree<number, number>;

  beforeEach(() => {
    tree = new RedBlackTree<number, number>();
  });

  describe('Initialization', () => {
    test('should start empty', () => {
      expect(tree.isEmpty()).toBe(true);
      expect(tree.size()).toBe(0);
    });

    test('should initialize with custom comparator', () => {
      const reverseTree = new RedBlackTree<number, number>((a, b) => b < a);
      reverseTree.insert(1, 1);
      reverseTree.insert(2, 2);
      const values: number[] = [];
      reverseTree.forEach((_, value) => values.push(value));
      expect(values).toEqual([2, 1]);
    });
  });

  describe('Insertion', () => {
    test('should insert values correctly', () => {
      tree.insert(5, 5);
      tree.insert(3, 3);
      tree.insert(7, 7);

      expect(tree.isEmpty()).toBe(false);
      expect(tree.size()).toBe(3);
      expect(tree.find(5)).toBe(5);
      expect(tree.find(3)).toBe(3);
      expect(tree.find(7)).toBe(7);
      expect(tree.find(1)).toBeUndefined();
    });

    test('should handle duplicate inserts', () => {
      tree.insert(5, 1);
      tree.insert(5, 2);
      tree.insert(5, 3);

      expect(tree.size()).toBe(1);
      expect(tree.find(5)).toBe(3);
    });

    test('should handle large number of insertions', () => {
      const values = Array.from({ length: 1000 }, (_, i) => i);
      values.forEach((v) => tree.insert(v, v));
      expect(tree.size()).toBe(1000);

      // Verify some random values
      expect(tree.find(42)).toBe(42);
      expect(tree.find(999)).toBe(999);
      expect(tree.find(500)).toBe(500);
    });
  });

  describe('Removal', () => {
    test('should remove values correctly', () => {
      tree.insert(5, 5);
      tree.insert(3, 3);
      tree.insert(7, 7);
      tree.insert(1, 1);
      tree.insert(9, 9);

      expect(tree.size()).toBe(5);

      tree.remove(3);
      expect(tree.find(3)).toBeUndefined();
      expect(tree.size()).toBe(4);

      tree.remove(5);
      expect(tree.find(5)).toBeUndefined();
      expect(tree.size()).toBe(3);
    });

    test('should handle removing non-existent values', () => {
      tree.insert(5, 5);
      tree.insert(3, 3);

      const initialSize = tree.size();
      tree.remove(7);

      expect(tree.size()).toBe(initialSize);
    });

    test('should handle removing root node', () => {
      tree.insert(5, 5);
      tree.insert(3, 3);
      tree.insert(7, 7);

      tree.remove(5);
      expect(tree.find(5)).toBeUndefined();
      expect(tree.size()).toBe(2);
      expect(tree.find(3)).toBe(3);
      expect(tree.find(7)).toBe(7);
    });

    test('should handle removing all nodes sequentially', () => {
      [5, 3, 7, 1, 9].forEach((v) => tree.insert(v, v));

      [5, 3, 7, 1, 9].forEach((v) => {
        tree.remove(v);
        expect(tree.find(v)).toBeUndefined();
      });

      expect(tree.isEmpty()).toBe(true);
    });
  });

  describe('Clear operation', () => {
    test('should clear all nodes', () => {
      tree.insert(5, 5);
      tree.insert(3, 3);
      tree.insert(7, 7);

      expect(tree.isEmpty()).toBe(false);

      tree.clear();

      expect(tree.isEmpty()).toBe(true);
      expect(tree.size()).toBe(0);
    });

    test('should handle clear on empty tree', () => {
      tree.clear();
      expect(tree.isEmpty()).toBe(true);
      expect(tree.size()).toBe(0);
    });
  });

  describe('Size management', () => {
    test('should maintain correct size after operations', () => {
      expect(tree.size()).toBe(0);

      tree.insert(1, 1);
      expect(tree.size()).toBe(1);

      tree.insert(2, 2);
      tree.insert(3, 3);
      expect(tree.size()).toBe(3);

      tree.remove(2);
      expect(tree.size()).toBe(2);

      tree.clear();
      expect(tree.size()).toBe(0);
    });

    test('should handle rapid insertions and deletions', () => {
      for (let i = 0; i < 100; i++) {
        tree.insert(i, i);
      }
      expect(tree.size()).toBe(100);

      for (let i = 0; i < 50; i++) {
        tree.remove(i);
      }
      expect(tree.size()).toBe(50);

      for (let i = 0; i < 25; i++) {
        tree.insert(i, i);
      }
      expect(tree.size()).toBe(75);
    });
  });

  describe('Iteration', () => {
    test('should iterate through values in order using forEach', () => {
      tree.insert(5, 50);
      tree.insert(3, 30);
      tree.insert(7, 70);
      tree.insert(1, 10);
      tree.insert(9, 90);

      const keys: number[] = [];
      const values: number[] = [];

      tree.forEach((key, value) => {
        keys.push(key);
        values.push(value);
      });

      expect(keys).toEqual([1, 3, 5, 7, 9]);
      expect(values).toEqual([10, 30, 50, 70, 90]);
    });

    test('should handle forEach on empty tree', () => {
      const values: number[] = [];
      tree.forEach((_, value) => values.push(value));
      expect(values).toEqual([]);
    });

    test('should maintain order after multiple operations', () => {
      const nums = [5, 3, 7, 1, 9, 2, 8, 4, 6];
      nums.forEach((n) => tree.insert(n, n * 10));

      const values: number[] = [];
      tree.forEach((_, value) => values.push(value));
      expect(values).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90]);
    });
  });

  describe('Equality', () => {
    test('should consider empty trees equal', () => {
      const tree1 = new RedBlackTree<number, number>();
      const tree2 = new RedBlackTree<number, number>();
      expect(tree1.equals(tree2)).toBe(true);
    });

    test('should consider trees with same key-value pairs equal', () => {
      const tree1 = new RedBlackTree<number, number>();
      const tree2 = new RedBlackTree<number, number>();

      [5, 3, 7, 1, 9].forEach((v) => {
        tree1.insert(v, v * 10);
        tree2.insert(v, v * 10);
      });

      expect(tree1.equals(tree2)).toBe(true);
    });

    test('should consider trees with different values unequal', () => {
      const tree1 = new RedBlackTree<number, number>();
      const tree2 = new RedBlackTree<number, number>();

      [5, 3, 7].forEach((v) => tree1.insert(v, v * 10));
      [5, 3, 7].forEach((v) => tree2.insert(v, v * 20));

      expect(tree1.equals(tree2)).toBe(false);
    });

    test('should consider trees with different keys unequal', () => {
      const tree1 = new RedBlackTree<number, number>();
      const tree2 = new RedBlackTree<number, number>();

      [5, 3, 7].forEach((v) => tree1.insert(v, v));
      [5, 3, 8].forEach((v) => tree2.insert(v, v));

      expect(tree1.equals(tree2)).toBe(false);
    });

    test('should consider trees with different sizes unequal', () => {
      const tree1 = new RedBlackTree<number, number>();
      const tree2 = new RedBlackTree<number, number>();

      [5, 3, 7].forEach((v) => tree1.insert(v, v));
      [5, 3].forEach((v) => tree2.insert(v, v));

      expect(tree1.equals(tree2)).toBe(false);
    });
  });
});
