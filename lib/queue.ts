import { LinkedList } from './linked-list';
import { BaseCollection } from './base-collection';


export interface Queue<T> {
  push(element: T): void;
  pop(): T | undefined;
  front(): T | undefined;
}


export class Queue<T> extends BaseCollection<T> implements Queue<T> {
  private items: LinkedList<T>;

  constructor() {
    super();
    this.items = new LinkedList<T>();
  }

  /**
   * Adds an element to the back of the queue.
   */
  push(element: T): void {
    this.items.pushBack(element);
  }

  /**
   * Removes and returns the front element from the queue, or undefined if queue is empty.
   */
  pop(): T | undefined {
    return this.items.popFront();
  }

  /**
   * Returns the front element of the queue without removing it, or undefined if queue is empty.
   */
  front(): T | undefined {
    return this.items.get(0);
  }

  /**
   * Checks if the queue is empty. Returns true if the queue is empty, false otherwise.
   */
  isEmpty(): boolean {
    return this.items.isEmpty();
  }

  /**
   * Returns the number of elements in the queue.
   */
  size(): number {
    return this.items.size();
  }

  /**
   * Removes all elements from the queue.
   */
  clear(): void {
    this.items.clear();
  }
}
