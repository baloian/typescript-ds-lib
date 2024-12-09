import { BinarySearchTree } from '../lib/binary-search-tree';

describe('BinarySearchTree', () => {
  let bst: BinarySearchTree<number>;

  beforeEach(() => {
    bst = new BinarySearchTree<number>();
  });

  test('should create empty tree', () => {
    expect(bst.isEmpty()).toBe(true);
  });

  test('should insert and search values', () => {
    bst.insert(5);
    bst.insert(3);
    bst.insert(7);
    
    expect(bst.find(5)).toBe(true);
    expect(bst.find(3)).toBe(true);
    expect(bst.find(7)).toBe(true);
    expect(bst.find(1)).toBe(false);
  });

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

  test('should remove leaf nodes', () => {
    bst.insert(5);
    bst.insert(3);
    bst.insert(7);

    bst.remove(3);
    expect(bst.find(3)).toBe(false);
    expect(bst.find(5)).toBe(true);
    expect(bst.find(7)).toBe(true);
  });

  test('should remove nodes with one child', () => {
    bst.insert(5);
    bst.insert(3);
    bst.insert(2);

    bst.remove(3);
    expect(bst.find(3)).toBe(false);
    expect(bst.find(5)).toBe(true);
    expect(bst.find(2)).toBe(true);
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
  });
});
