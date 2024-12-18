import { LinkedList } from "./linked-list";


export interface Stack<T> {
  push(element: T): void;
  pop(): T | undefined;
  top(): T | undefined;
  isEmpty(): boolean;
  size(): number;
  clear(): void;
}


export class Stack<T> implements Stack<T> {
  private llData: LinkedList<T> = new LinkedList<T>();

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
}
