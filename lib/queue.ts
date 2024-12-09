export interface QueueTy<T> {
  push(element: T): void;
  pop(): T | undefined;
  front(): T | undefined;
  empty(): boolean;
  size(): number;
  clear(): void;
}


export class Queue<T> implements QueueTy<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  /**
   * Adds an element to the back of the queue.
   */
  push(element: T): void {
    this.items.push(element);
  }

  /**
   * Removes and returns the front element from the queue, or undefined if queue is empty.
   */
  pop(): T | undefined {
    return this.items.shift();
  }

  /**
   * Returns the front element of the queue without removing it, or undefined if queue is empty.
   */
  front(): T | undefined {
    return this.items[0];
  }

  /**
   * Checks if the queue is empty. Returns true if the queue is empty, false otherwise.
   */
  empty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Returns the number of elements in the queue.
   */
  size(): number {
    return this.items.length;
  }

  /**
   * Removes all elements from the queue.
   */
  clear(): void {
    this.items = [];
  }
}
