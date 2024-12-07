import { RedBlackTree } from '../lib/red-black-tree';

describe('RedBlackTree', () => {
  let tree: RedBlackTree<number, number>;

  beforeEach(() => {
    tree = new RedBlackTree<number, number>();
  });

  test('should start empty', () => {
    expect(tree.empty()).toBe(true);
    expect(tree.size()).toBe(0);
  });

  test('should insert values correctly', () => {
    tree.insert(5, 5);
    tree.insert(3, 3);
    tree.insert(7, 7);

    expect(tree.empty()).toBe(false);
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

  test('should clear all nodes', () => {
    tree.insert(5, 5);
    tree.insert(3, 3);
    tree.insert(7, 7);

    expect(tree.empty()).toBe(false);
    
    tree.clear();
    
    expect(tree.empty()).toBe(true);
    expect(tree.size()).toBe(0);
  });

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
});
