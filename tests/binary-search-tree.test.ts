import { BinarySearchTree } from '../lib/binary-search-tree';

describe('BinarySearchTree', () => {
  let bst: BinarySearchTree<number>;

  beforeEach(() => {
    bst = new BinarySearchTree<number>();
  });

  describe('Basic Operations', () => {
    test('should create empty tree', () => {
      expect(bst.isEmpty()).toBe(true);
      expect(bst.size()).toBe(0);
    });

    test('should insert and search values', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);

      expect(bst.find(5)).toBe(true);
      expect(bst.find(3)).toBe(true);
      expect(bst.find(7)).toBe(true);
      expect(bst.find(1)).toBe(false);
      expect(bst.size()).toBe(3);
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
      expect(bst.size()).toBe(0);
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

    test('should handle min/max with unbalanced tree', () => {
      bst.insert(10);
      bst.insert(8);
      bst.insert(6);
      bst.insert(4);
      bst.insert(2);

      expect(bst.min()).toBe(2);
      expect(bst.max()).toBe(10);

      bst.remove(2);
      expect(bst.min()).toBe(4);

      bst.remove(10);
      expect(bst.max()).toBe(8);
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
      expect(bst.size()).toBe(2);
    });

    test('should remove nodes with one child', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(2);

      bst.remove(3);
      expect(bst.find(3)).toBe(false);
      expect(bst.find(5)).toBe(true);
      expect(bst.find(2)).toBe(true);
      expect(bst.size()).toBe(2);
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
      expect(bst.size()).toBe(4);
    });

    test('should handle removing root node', () => {
      bst.insert(5);
      bst.insert(3);
      bst.insert(7);

      bst.remove(5);
      expect(bst.find(5)).toBe(false);
      expect(bst.find(3)).toBe(true);
      expect(bst.find(7)).toBe(true);
      expect(bst.size()).toBe(2);
    });

    test('should handle removing non-existent values', () => {
      bst.insert(5);
      bst.insert(3);

      bst.remove(7);
      expect(bst.size()).toBe(2);
      expect(bst.find(5)).toBe(true);
      expect(bst.find(3)).toBe(true);
    });

    test('should handle complex removal scenario', () => {
      // Create a more complex tree structure
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);
      bst.insert(13);
      bst.insert(17);
      bst.insert(1);
      bst.insert(4);
      bst.insert(6);
      bst.insert(8);

      // Remove nodes in specific order to test different cases
      bst.remove(5);  // Remove node with two children
      expect(bst.size()).toBe(10);

      const result: number[] = [];
      bst.forEach((value) => result.push(value));
      expect(result).toEqual([1, 3, 4, 6, 7, 8, 10, 13, 15, 17]);

      bst.remove(15); // Remove another node with two children
      bst.remove(1);  // Remove leaf node
      bst.remove(17); // Remove node with no left child
      bst.remove(3);  // Remove node with one child

      const finalResult: number[] = [];
      bst.forEach((value) => finalResult.push(value));
      expect(finalResult).toEqual([4, 6, 7, 8, 10, 13]);
      expect(bst.size()).toBe(6);
    });
  });

  describe('Special Cases', () => {
    test('should not allow duplicate values', () => {
      const bst = new BinarySearchTree<number>();
      bst.insert(5);
      bst.insert(5); // Should not insert
      bst.insert(5); // Should not insert

      expect(bst.size()).toBe(1);
      bst.remove(5);
      expect(bst.size()).toBe(0);
      expect(bst.find(5)).toBe(false);
    });

    test('should work with custom comparator', () => {
      const reverseBst = new BinarySearchTree<number>((a, b) => a > b);
      reverseBst.insert(5);
      reverseBst.insert(3);
      reverseBst.insert(7);

      expect(reverseBst.min()).toBe(7);
      expect(reverseBst.max()).toBe(3);
    });

    test('should handle complex operations with custom comparator', () => {
      const customBst = new BinarySearchTree<string>((a, b) => a.length < b.length || (a.length === b.length && a < b));

      customBst.insert("cat");
      customBst.insert("dog");
      customBst.insert("elephant");
      customBst.insert("fox");
      customBst.insert("butterfly");

      expect(customBst.min()).toBe("cat");
      expect(customBst.max()).toBe("butterfly");

      const result: string[] = [];
      customBst.forEach((value) => result.push(value));
      expect(result).toEqual(["cat", "dog", "fox", "elephant", "butterfly"]);
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

    test('should handle complex traversal scenarios', () => {
      // Create an unbalanced tree
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(3);
      bst.insert(7);
      bst.insert(13);
      bst.insert(17);
      bst.insert(1);

      const inOrder: number[] = [];
      const preOrder: number[] = [];
      const postOrder: number[] = [];

      bst.forEach((value) => inOrder.push(value), 'inorder');
      bst.forEach((value) => preOrder.push(value), 'preorder');
      bst.forEach((value) => postOrder.push(value), 'postorder');

      expect(inOrder).toEqual([1, 3, 5, 7, 10, 13, 15, 17]);
      expect(preOrder).toEqual([10, 5, 3, 1, 7, 15, 13, 17]);
      expect(postOrder).toEqual([1, 3, 7, 5, 13, 17, 15, 10]);

      // Remove some nodes and verify traversal still works
      bst.remove(5);
      bst.remove(15);

      const newInOrder: number[] = [];
      bst.forEach((value) => newInOrder.push(value));
      expect(newInOrder).toEqual([1, 3, 7, 10, 13, 17]);
    });
  });
});
