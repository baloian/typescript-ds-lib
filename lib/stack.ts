import { BaseCollection } from "./base-collection";
import { LinkedList } from "./linked-list";


export interface Stack<T> {
  push(element: T): void;
  pop(): T | undefined;
  top(): T | undefined;
}


export class Stack<T> extends BaseCollection<T> implements Stack<T> {
  private llData: LinkedList<T>;

  constructor() {
    super();
    this.llData = new LinkedList<T>();
  }

  /**
   * Adds an element to the top of the stack.
   */
  push(element: T): void {
    this.llData.pushFront(element);
  }

  /**
   * Removes and returns the top element from the stack, or undefined if stack is empty.
   */
  pop(): T | undefined {
    return this.llData.popFront();
  }

  /**
   * Returns the top element of the stack without removing it, or undefined if stack is empty.
   */
  top(): T | undefined {
    return this.llData.front();
  }

  /**
   * Checks if the stack is empty. Returns true if the stack is empty, false otherwise.
   */
  isEmpty(): boolean {
    return this.llData.isEmpty();
  }

  /**
   * Returns the number of elements in the stack. The size of the stack
   */
  size(): number {
    return this.llData.size();
  }

  /**
   * Removes all elements from the stack.
   */
  clear(): void {
    this.llData.clear();
  }

  /**
   * Checks if two stacks are equal.
   */
  equals(other: Stack<T>): boolean {
    return this.llData.equals(other.llData);
  }
}
