import { Comparator } from '../types';
import { BinarySearchTree } from './binary-search-tree';


export interface Set<T> {
  insert(element: T): void;
  insertList(elements: T[]): void;
  remove(element: T): void;
  find(element: T): boolean;
  forEach(callback: (element: T) => void): void;
  isEmpty(): boolean;
  size(): number;
  clear(): void;
}


export class Set<T> implements Set<T> {
  private bst: BinarySearchTree<T>;

  constructor(comparator: Comparator<T> = (a: T, b: T) => a < b) {
    this.bst = new BinarySearchTree<T>(comparator);
  }

  /**
   * Adds a value to the set if it's not already present
   */
  insert(value: T): void {
    if (!this.find(value)) {
      this.bst.insert(value);
    }
  }

  /**
   * Adds multiple values to the set if they're not already present
   */
  insertList(values: T[]): void {
    for (const value of values) {
      this.insert(value);
    }
  }

  /**
   * Checks if a value exists in the set
   */
  find(value: T): boolean {
    return this.bst.find(value);
  }

  /**
   * Removes a value from the set
   */
  remove(value: T): void {
    this.bst.remove(value);
  }

  /**
   * Executes a callback function for each element in the set
   */
  forEach(callback: (element: T) => void): void {
    this.bst.forEach(callback);
  }

  /**
   * Removes all elements from the set
   */
  clear(): void {
    this.bst = new BinarySearchTree<T>();
  }

  /**
   * Returns true if the set contains no elements
   */
  isEmpty(): boolean {
    return this.bst.isEmpty();
  }

  /**
   * Returns the number of elements in the set
   */
  size(): number {
    return this.bst.count();
  }
}
