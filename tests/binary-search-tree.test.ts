import { BinarySearchTree } from '../lib/binary-search-tree';

describe('BinarySearchTree', () => {
  let bst: BinarySearchTree<number>;

  beforeEach(() => {
    bst = new BinarySearchTree<number>();
  });

  describe('Basic Operations', () => {
    test('should create empty tree', () => {
      expect(bst.isEmpty()).toBe(true);
      expect(bst.count()).toBe(0);
    });

    test('should insert and search values', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);

      expect(bst.find(5)).toBe(true);
      expect(bst.find(3)).toBe(true);
      expect(bst.find(7)).toBe(true);
      expect(bst.find(1)).toBe(false);
      expect(bst.count()).toBe(3);
      expect(bst.isEmpty()).toBe(false);
    });

    test('should clear all nodes from tree', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);

      bst.clear();
      expect(bst.isEmpty()).toBe(true);
      expect(bst.find(5)).toBe(false);
      expect(bst.min()).toBeUndefined();
      expect(bst.max()).toBeUndefined();
      expect(bst.count()).toBe(0);
    });
  });

  describe('Min/Max Operations', () => {
    test('should find min and max values', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      bst.insert(1);
      bst.insert(9);

      expect(bst.min()).toBe(1);
      expect(bst.max()).toBe(9);
    });

    test('should return undefined min/max for empty tree', () => {
      expect(bst.min()).toBeUndefined();
      expect(bst.max()).toBeUndefined();
    });
  });

  describe('Remove Operations', () => {
    test('should remove leaf nodes', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);

      bst.remove(3);
      expect(bst.find(3)).toBe(false);
      expect(bst.find(5)).toBe(true);
      expect(bst.find(7)).toBe(true);
      expect(bst.count()).toBe(2);
    });

    test('should remove nodes with one child', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(2);

      bst.remove(3);
      expect(bst.find(3)).toBe(false);
      expect(bst.find(5)).toBe(true);
      expect(bst.find(2)).toBe(true);
      expect(bst.count()).toBe(2);
    });

    test('should remove nodes with two children', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      bst.insert(6);
      bst.insert(8);

      bst.remove(7);
      expect(bst.find(7)).toBe(false);
      expect(bst.find(5)).toBe(true);
      expect(bst.find(8)).toBe(true);
      expect(bst.find(6)).toBe(true);
      expect(bst.count()).toBe(4);
    });

    test('should handle removing root node', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);

      bst.remove(5);
      expect(bst.find(5)).toBe(false);
      expect(bst.find(3)).toBe(true);
      expect(bst.find(7)).toBe(true);
      expect(bst.count()).toBe(2);
    });

    test('should handle removing non-existent values', () => {
      bst.insert(5);
      bst.insert(3);

      bst.remove(7);
      expect(bst.count()).toBe(2);
      expect(bst.find(5)).toBe(true);
      expect(bst.find(3)).toBe(true);
    });
  });

  describe('Special Cases', () => {
    test('should maintain order with duplicate values', () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(5);
      bst.insert(5);
      bst.insert(5);

      expect(bst.count()).toBe(3);
      bst.remove(5);
      expect(bst.count()).toBe(2);
      expect(bst.find(5)).toBe(true);
    });

    test('should work with custom comparator', () => {
      const reverseBst = new BinarySearchTree<number>((a, b) => a > b);
      reverseBst.insert(5);
      reverseBst.insert(3);
      reverseBst.insert(7);

      expect(reverseBst.min()).toBe(7);
      expect(reverseBst.max()).toBe(3);
    });
  });

  describe('Traversal Operations', () => {
    test('should traverse tree in-order', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      bst.insert(1);
      bst.insert(9);

      const result: number[] = [];
      bst.forEach((value) => result.push(value));
      expect(result).toEqual([1, 3, 5, 7, 9]);
    });

    test('should traverse tree pre-order', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      bst.insert(1);
      bst.insert(9);

      const result: number[] = [];
      bst.forEach((value) => result.push(value), 'preorder');
      expect(result).toEqual([5, 3, 1, 7, 9]);
    });

    test('should traverse tree post-order', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);
      bst.insert(1);
      bst.insert(9);

      const result: number[] = [];
      bst.forEach((value) => result.push(value), 'postorder');
      expect(result).toEqual([1, 3, 9, 7, 5]);
    });

    test('should handle forEach on empty tree', () => {
      const result: number[] = [];
      bst.forEach((value) => result.push(value));
      expect(result).toEqual([]);
    });
  });
});
