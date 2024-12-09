export interface PriorityQueue<T> {
  push(element: T, priority: number): void;
  pop(): T | undefined;
  front(): T | undefined;
  isEmpty(): boolean;
  size(): number;
  clear(): void;
}


export class PriorityQueue<T> implements PriorityQueue<T> {
  private items: { element: T; priority: number }[];

  constructor() {
    this.items = [];
  }

  /**
   * Adds an element with a priority to the queue.
   * Lower priority numbers have higher precedence.
   */
  push(element: T, priority: number): void {
    const item = { element, priority };
    let added = false;
    for (let i = 0; i < this.items.length; i++) {
      if (priority > this.items[i].priority) {
        this.items.splice(i, 0, item);
        added = true;
        break;
      }
    }
    if (!added) this.items.push(item);
  }

  /**
   * Removes and returns the highest priority element from the queue, 
   * or undefined if queue is empty.
   */
  pop(): T | undefined {
    const item = this.items.shift();
    return item?.element;
  }

  /**
   * Returns the highest priority element without removing it,
   * or undefined if queue is empty.
   */
  front(): T | undefined {
    return this.items[0]?.element;
  }

  /**
   * Checks if the queue is empty. Returns true if empty, false otherwise.
   */
  isEmpty(): boolean {
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
