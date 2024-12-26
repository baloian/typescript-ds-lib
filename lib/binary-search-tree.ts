import { Comparator } from '../types';
import { BaseCollection } from './base-collection';


export interface BinarySearchTree<T> {
  insert(element: T): void;
  remove(element: T): void;
  find(element: T): boolean;
  min(): T | undefined;
  max(): T | undefined;
  forEach(callback: (element: T) => void, traversal?: 'inorder' | 'preorder' | 'postorder'): void;
}


class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}


export class BinarySearchTree<T> extends BaseCollection<T> implements BinarySearchTree<T> {
  private root: TreeNode<T> | null;
  private comparator: Comparator<T>;
  private nodeCount: number;

  constructor(comparator: Comparator<T> = (a: T, b: T) => a < b) {
    super();
    this.root = null;
    this.comparator = comparator;
    this.nodeCount = 0;
  }

  /**
   * Inserts a value into the BST if it doesn't already exist
   */
  insert(value: T): void {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      this.nodeCount++;
      return;
    }
    let current = this.root;
    while (true) {
      if (this.comparator(value, current.value)) {
        if (current.left === null) {
          current.left = newNode;
          this.nodeCount++;
          break;
        }
        current = current.left;
      } else if (this.isEqual(value, current.value)) {
        return;
      } else {
        if (current.right === null) {
          current.right = newNode;
          this.nodeCount++;
          break;
        }
        current = current.right;
      }
    }
  }

  /**
   * Searches for a value in the BST. Returns true if found, false otherwise
   */
  find(value: T): boolean {
    let current = this.root;
    while (current !== null) {
      if (this.isEqual(value, current.value)) {
        return true;
      }
      if (this.comparator(value, current.value)) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  /**
   * Returns the minimum value in the BST, or undefined if tree is empty
   */
  min(): T | undefined {
    if (!this.root) return undefined;
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.value;
  }

  /**
   * Returns the maximum value in the BST, or undefined if tree is empty
   */
  max(): T | undefined {
    if (!this.root) return undefined;
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.value;
  }

  /**
   * Removes a value from the BST if it exists
   */
  remove(value: T): void {
    this.root = this.removeNode(this.root, value);
  }

  private removeNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (node === null) return null;
    if (this.comparator(value, node.value)) {
      node.left = this.removeNode(node.left, value);
      return node;
    } else if (this.comparator(node.value, value)) {
      node.right = this.removeNode(node.right, value);
      return node;
    } else {
      // Node to delete found
      this.nodeCount--;
      // Case 1: Leaf node
      if (node.left === null && node.right === null) {
        return null;
      }
      // Case 2: Node with one child
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      // Case 3: Node with two children
      const minNode = this.findMin(node.right);
      node.value = minNode.value;
      node.right = this.removeNode(node.right, minNode.value);
      this.nodeCount++; // Increment back since the recursive call decremented
      return node;
    }
  }

  private findMin(node: TreeNode<T>): TreeNode<T> {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  private isEqual(a: T, b: T): boolean {
    // Two values are equal if neither is less than the other
    return !this.comparator(a, b) && !this.comparator(b, a);
  }

  /**
   * Executes a callback function for each element in the BST in-order traversal
   */
  forEach(callback: (element: T) => void, traversal: 'inorder' | 'preorder' | 'postorder' = 'inorder'): void {
    switch (traversal) {
      case 'inorder':
        this.inorderTraversal(this.root, callback);
        break;
      case 'preorder':
        this.preorderTraversal(this.root, callback);
        break;
      case 'postorder':
        this.postorderTraversal(this.root, callback);
        break;
      default:
        this.inorderTraversal(this.root, callback);
    }
  }

  private inorderTraversal(node: TreeNode<T> | null, callback: (element: T) => void): void {
    if (node === null) return;
    this.inorderTraversal(node.left, callback);
    callback(node.value);
    this.inorderTraversal(node.right, callback);
  }

  private preorderTraversal(node: TreeNode<T> | null, callback: (element: T) => void): void {
    if (node === null) return;
    callback(node.value);
    this.preorderTraversal(node.left, callback);
    this.preorderTraversal(node.right, callback);
  }

  private postorderTraversal(node: TreeNode<T> | null, callback: (element: T) => void): void {
    if (node === null) return;
    this.postorderTraversal(node.left, callback);
    this.postorderTraversal(node.right, callback);
    callback(node.value);
  }

  /**
   * Returns true if the BST is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.root === null;
  }

  /**
   * Removes all nodes from the BST
   */
  clear(): void {
    this.root = null;
    this.nodeCount = 0;
  }

  /**
   * Returns the number of nodes in the BST.
   */
  size(): number {
    return this.nodeCount;
  }

  /**
   * Checks if two BSTs are equal.
   */
  equals(other: BinarySearchTree<T>): boolean {
    if (!other || !(other instanceof BinarySearchTree)) return false;
    if (this.size() !== other.size()) return false;
    const thisValues: T[] = [];
    const otherValues: T[] = [];
    this.forEach((value) => thisValues.push(value));
    other.forEach((value) => otherValues.push(value));
    return thisValues.every((value, index) => this.isEqual(value, otherValues[index]));
    }
}
