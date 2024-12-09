export interface Deque<T> {
  pushFront(element: T): void;
  pushBack(element: T): void;
  popFront(): T | undefined;
  popBack(): T | undefined;
  front(): T | undefined;
  back(): T | undefined;
  empty(): boolean;
  size(): number;
  clear(): void;
}


export class Deque<T> implements Deque<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  /**
   * Adds an element to the front of the deque
   */
  pushFront(element: T): void {
    this.items.unshift(element);
  }

  /**
   * Adds an element to the back of the deque
   */
  pushBack(element: T): void {
    this.items.push(element);
  }

  /**
   * Removes and returns the front element from the deque, or undefined if deque is empty
   */
  popFront(): T | undefined {
    return this.items.shift();
  }

  /**
   * Removes and returns the back element from the deque, or undefined if deque is empty
   */
  popBack(): T | undefined {
    return this.items.pop();
  }

  /**
   * Returns the front element without removing it, or undefined if deque is empty
   */
  front(): T | undefined {
    return this.items[0];
  }

  /**
   * Returns the back element without removing it, or undefined if deque is empty
   */
  back(): T | undefined {
    return this.items[this.items.length - 1];
  }

  /**
   * Returns true if the deque is empty, false otherwise
   */
  empty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Returns the number of elements in the deque
   */
  size(): number {
    return this.items.length;
  }

  /**
   * Removes all elements from the deque
   */
  clear(): void {
    this.items = [];
  }
}
