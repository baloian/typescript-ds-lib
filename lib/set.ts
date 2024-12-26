import { BaseCollection } from './base-collection';
import { BinarySearchTree } from './binary-search-tree';
import { Comparator } from '../types';


export interface Set<T> {
  insert(element: T): void;
  insertList(elements: T[]): void;
  remove(element: T): void;
  find(element: T): boolean;
  has(element: T): boolean;
  forEach(callback: (element: T) => void): void;
}


export class Set<T> extends BaseCollection<T> implements Set<T> {
  private tree: BinarySearchTree<T>;

  constructor(comparator: Comparator<T> = (a: T, b: T) => a < b) {
    super();
    this.tree = new BinarySearchTree<T>(comparator);
  }

  /**
   * Adds a value to the set if it's not already present.
   */
  insert(value: T): void {
    this.tree.insert(value);
  }

  /**
   * Adds multiple values to the set if they're not already present.
   */
  insertList(values: T[]): void {
    for (const value of values) {
      this.tree.insert(value);
    }
  }

  /**
   * Checks if a value exists in the set.
   */
  find(value: T): boolean {
    return this.tree.find(value);
  }

  has(value: T): boolean {
    return this.find(value);
  }

  /**
   * Removes a value from the set.
   */
  remove(value: T): void {
    this.tree.remove(value);
  }

  forEach(callback: (element: T) => void): void {
    this.tree.forEach(callback);
  }

  /**
   * Removes all elements from the set.
   */
  clear(): void {
    this.tree = new BinarySearchTree<T>();
  }

  /**
   * Returns true if the set contains no elements.
   */
  isEmpty(): boolean {
    return this.tree.size() === 0;
  }

  /**
   * Returns the number of elements in the set.
   */
  size(): number {
    return this.tree.size();
  }

  /**
   * Checks if two sets are equal.
   */
  equals(other: Set<T>): boolean {
    if (!other || !(other instanceof Set)) return false;
    return this.tree.equals(other.tree);
  }
}
