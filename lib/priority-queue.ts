import { LinkedList } from './linked-list';


export interface PriorityQueue<T> {
  push(element: T, priority: number): void;
  pop(): T | undefined;
  front(): T | undefined;
  isEmpty(): boolean;
  size(): number;
  clear(): void;
}


export class PriorityQueue<T> implements PriorityQueue<T> {
  private list: LinkedList<{element: T; priority: number}>;

  constructor() {
    this.list = new LinkedList<{element: T; priority: number}>();
  }

  /**
   * Adds an element with a priority to the queue.
   * Lower priority numbers have higher precedence.
   */
  push(element: T, priority: number): void {
    const item = { element, priority };
    if (this.list.isEmpty()) {
      this.list.pushBack(item);
      return;
    }
    if (!this.list.insertBefore(item, (current) => current.priority < priority)) {
      this.list.pushBack(item);
    }
  }

  /**
   * Removes and returns the highest priority element from the queue, or undefined if queue is empty.
   */
  pop(): T | undefined {
    const item = this.list.popFront();
    return item?.element;
  }

  /**
   * Returns the highest priority element without removing it, or undefined if queue is empty.
   */
  front(): T | undefined {
    return this.list.front()?.element;
  }

  /**
   * Checks if the queue is empty. Returns true if empty, false otherwise.
   */
  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  /**
   * Returns the number of elements in the queue.
   */
  size(): number {
    return this.list.size();
  }

  /**
   * Removes all elements from the queue.
   */
  clear(): void {
    this.list.clear();
  }
}
