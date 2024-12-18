import { LinkedList } from './linked-list';
import { BaseCollection } from './base-collection';


export interface Deque<T> {
  pushFront(element: T): void;
  pushBack(element: T): void;
  popFront(): T | undefined;
  popBack(): T | undefined;
  front(): T | undefined;
  back(): T | undefined;
}


export class Deque<T> extends BaseCollection<T> implements Deque<T> {
  private items: LinkedList<T>;

  constructor() {
    super();
    this.items = new LinkedList<T>();
  }

  /**
   * Adds an element to the front of the deque
   */
  pushFront(element: T): void {
    this.items.pushFront(element);
  }

  /**
   * Adds an element to the back of the deque
   */
  pushBack(element: T): void {
    this.items.pushBack(element);
  }

  /**
   * Removes and returns the front element from the deque, or undefined if deque is empty
   */
  popFront(): T | undefined {
    return this.items.popFront();
  }

  /**
   * Removes and returns the back element from the deque, or undefined if deque is empty
   */
  popBack(): T | undefined {
    return this.items.popBack();
  }

  /**
   * Returns the front element without removing it, or undefined if deque is empty
   */
  front(): T | undefined {
    return this.items.get(0);
  }

  /**
   * Returns the back element without removing it, or undefined if deque is empty
   */
  back(): T | undefined {
    return this.items.get(this.items.size() - 1);
  }

  /**
   * Returns true if the deque is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.items.isEmpty();
  }

  /**
   * Returns the number of elements in the deque
   */
  size(): number {
    return this.items.size();
  }

  /**
   * Removes all elements from the deque
   */
  clear(): void {
    this.items.clear();
  }
}
