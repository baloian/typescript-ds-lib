export interface Stack<T> {
  push(element: T): void;
  pop(): T | undefined;
  top(): T | undefined;
  isEmpty(): boolean;
  size(): number;
  clear(): void;
}


export class Stack<T> implements Stack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  /**
   * Adds an element to the top of the stack.
   */
  push(element: T): void {
    this.items.push(element);
  }

  /**
   * Removes and returns the top element from the stack, or undefined if stack is empty.
   */
  pop(): T | undefined {
    return this.items.pop();
  }

  /**
   * Returns the top element of the stack without removing it, or undefined if stack is empty.
   */
  top(): T | undefined {
    return this.items[this.items.length - 1];
  }

  /**
   * Checks if the stack is empty. Returns true if the stack is empty, false otherwise.
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Returns the number of elements in the stack. The size of the stack
   */
  size(): number {
    return this.items.length;
  }

  /**
   * Removes all elements from the stack.
   */
  clear(): void {
    this.items = [];
  }
}
