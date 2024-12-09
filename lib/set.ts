import { Comparator } from '../types';
import { BinarySearchTree } from './binary-search-tree';


export interface Set<T> {
  insert(element: T): void;
  remove(element: T): void;
  find(element: T): boolean;
  empty(): boolean;
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
   * Removes all elements from the set
   */
  clear(): void {
    this.bst = new BinarySearchTree<T>();
  }

  /**
   * Returns true if the set contains no elements
   */
  empty(): boolean {
    return this.bst.empty();
  }

  /**
   * Returns the number of elements in the set
   */
  size(): number {
    return this.bst.count();
  }
}
