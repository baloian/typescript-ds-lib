import { Comparator } from '../types';


export interface BinarySearchTree<T> {
  insert(element: T): void;
  remove(element: T): void;
  find(element: T): boolean;
  min(): T | undefined;
  max(): T | undefined;
  empty(): boolean;
  clear(): void;
  count(): number;
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


export class BinarySearchTree<T> implements BinarySearchTree<T> {
  private root: TreeNode<T> | null;
  private comparator: Comparator<T>;

  constructor(comparator: Comparator<T> = (a: T, b: T) => a < b) {
    this.root = null;
    this.comparator = comparator;
  }

  /**
   * Inserts a value into the BST
   */
  insert(value: T): void {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (this.comparator(value, current.value)) {
        if (current.left === null) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
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
   * Returns true if the BST is empty, false otherwise
   */
  empty(): boolean {
    return this.root === null;
  }

  /**
   * Removes all nodes from the BST
   */
  clear(): void {
    this.root = null;
  }

  /**
   * Returns the number of nodes in the BST
   */
  count(): number {
    return this.countNodes(this.root);
  }

  private countNodes(node: TreeNode<T> | null): number {
    if (node === null) return 0;
    return 1 + this.countNodes(node.left) + this.countNodes(node.right);
  }
}
