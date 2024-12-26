import { Heap } from './heap';
import { BaseCollection } from './base-collection';
import { Comparator } from '../types';


export interface PriorityQueue<T> {
  push(element: T, priority: number): void;
  pop(): T | undefined;
  front(): T | undefined;
}


export class PriorityQueue<T> extends BaseCollection<T> implements PriorityQueue<T> {
  private heap: Heap<T>;

  constructor(comparator: Comparator<T> = (a: T, b: T) => a > b) {
    super();
    this.heap = new Heap<T>(comparator);
  }

  /**
   * Adds an element with a priority to the queue.
   * Lower priority numbers have higher precedence.
   */
  push(element: T): void {
    this.heap.push(element);
  }

  /**
   * Removes and returns the highest priority element from the queue, or undefined if queue is empty.
   */
  pop(): T | undefined {
    return this.heap.pop();
  }

  /**
   * Returns the highest priority element without removing it, or undefined if queue is empty.
   */
  front(): T | undefined {
    return this.heap.top();
  }

  /**
   * Checks if the queue is empty. Returns true if empty, false otherwise.
   */
  isEmpty(): boolean {
    return this.heap.isEmpty();
  }

  /**
   * Returns the number of elements in the queue.
   */
  size(): number {
    return this.heap.size();
  }

  /**
   * Removes all elements from the queue.
   */
  clear(): void {
    this.heap.clear();
  }

  /**
   * Checks if two priority queues are equal.
   */
  equals(other: PriorityQueue<T>): boolean {
    return this.heap.equals(other.heap);
  }
}
