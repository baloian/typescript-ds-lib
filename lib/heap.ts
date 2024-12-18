import { Comparator } from '../types';
import { BaseCollection } from './base-collection';


export interface Heap<T> {
  push(element: T): void;
  pop(): T | undefined; 
  top(): T | undefined;
}


export class Heap<T> extends BaseCollection<T> implements Heap<T> {
  private items: T[];
  private comparator: Comparator<T>;

  constructor(comparator: Comparator<T> = (a: T, b: T) => a < b) {
    super();
    this.items = [];
    this.comparator = comparator;
  }

  /**
   * Adds an element to the heap.
   */
  push(element: T): void {
    this.items.push(element);
    this.heapifyUp(this.items.length - 1);
  }

  /**
   * Removes and returns the root element from the heap, or undefined if heap is empty.
   */
  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const root: T = this.items[0];
    const lastElement: T = this.items.pop()!;
    if (!this.isEmpty()) {
      this.items[0] = lastElement;
      this.heapifyDown(0);
    }
    return root;
  }

  /**
   * Returns the root element without removing it, or undefined if heap is empty.
   */
  top(): T | undefined {
    return this.items[0];
  }

  /**
   * Checks if the heap is empty. Returns true if empty, false otherwise.
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Returns the number of elements in the heap.
   */
  size(): number {
    return this.items.length;
  }

  /**
   * Removes all elements from the heap.
   */
  clear(): void {
    this.items = [];
  }

  /**
   * Moves an element up the heap to its correct position.
   */
  private heapifyUp(index: number): void {
    while (index > 0) {
      const parentIndex: number = Math.floor((index - 1) / 2);
      if (this.comparator(this.items[index], this.items[parentIndex])) {
        [this.items[index], this.items[parentIndex]] = 
        [this.items[parentIndex], this.items[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  /**
   * Moves an element down the heap to its correct position.
   */
  private heapifyDown(index: number): void {
    while (true) {
      let smallestIndex: number = index;
      const leftChild: number = 2 * index + 1;
      const rightChild: number = 2 * index + 2;
      if (leftChild < this.items.length && 
          this.comparator(this.items[leftChild], this.items[smallestIndex])) {
        smallestIndex = leftChild;
      }
      if (rightChild < this.items.length && 
          this.comparator(this.items[rightChild], this.items[smallestIndex])) {
        smallestIndex = rightChild;
      }
      if (smallestIndex === index) {
        break;
      }
      [this.items[index], this.items[smallestIndex]] = 
      [this.items[smallestIndex], this.items[index]];
      index = smallestIndex;
    }
  }
}
