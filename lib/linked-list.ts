export interface LinkedList<T> {
  pushBack(element: T): void;
  pushFront(element: T): void;
  insert(element: T, position: number): boolean;
  removeIf(condition: (element: T) => boolean): boolean;
  removeAt(position: number): T | undefined;
  get(position: number): T | undefined;
  isEmpty(): boolean;
  size(): number;
  clear(): void;
}


class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}


export class LinkedList<T> implements LinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Adds an element to the end of the list
   */
  pushBack(element: T): void {
    const newNode = new Node(element);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  /**
   * Adds an element to the front of the list
   */
  pushFront(element: T): void {
    const newNode = new Node(element);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  /**
   * Inserts an element at the specified position. Returns true if successful, false if position is invalid
   */
  insert(element: T, position: number): boolean {
    if (position < 0 || position > this.length) {
      return false;
    }
    if (position === 0) {
      this.pushFront(element);
      return true;
    }
    if (position === this.length) {
      this.pushBack(element);
      return true;
    }

    const newNode = new Node(element);
    let current = this.head;
    let prev: Node<T> | null = null;
    let index: number = 0;

    while (index < position) {
      prev = current;
      current = current!.next;
      index++;
    }

    prev!.next = newNode;
    newNode.next = current;
    this.length++;
    return true;
  }

  /**
   * Removes the first element that satisfies the predicate. Returns true if an element was removed, false otherwise.
   */
  removeIf(condition: (element: T) => boolean): boolean {
    let current: Node<T> | null = this.head;
    let prev: Node<T> | null = null;
    while (current !== null) {
      if (condition(current.value)) {
        if (prev === null) {
          this.head = current.next;
        } else {
          prev.next = current.next;
        }
        if (current === this.tail) {
          this.tail = prev;
        }
        this.length--;
        return true;
      }
      prev = current;
      current = current.next;
    }
    return false;
  }

  /**
   * Removes and returns the element at the specified position. Returns undefined if position is invalid
   */
  removeAt(position: number): T | undefined {
    if (position < 0 || position >= this.length) {
      return undefined;
    }
    let current: Node<T> | null = this.head;
    if (position === 0) {
      this.head = current!.next;
      if (this.length === 1) {
        this.tail = null;
      }
      this.length--;
      return current!.value;
    }

    let prev: Node<T> | null = null;
    let index: number = 0;
    while (index < position) {
      prev = current;
      current = current!.next;
      index++;
    }
    prev!.next = current!.next;
    if (position === this.length - 1) {
      this.tail = prev;
    }
    this.length--;
    return current!.value;
  }

  /**
   * Returns the element at the specified position without removing it. Returns undefined if position is invalid
   */
  get(position: number): T | undefined {
    if (position < 0 || position >= this.length) {
      return undefined;
    }
    let current: Node<T> | null = this.head;
    let index: number = 0;
    while (index < position) {
      current = current!.next;
      index++;
    }
    return current!.value;
  }

  /**
   * Returns true if the list is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Returns the number of elements in the list
   */
  size(): number {
    return this.length;
  }

  /**
   * Removes all elements from the list
   */
  clear(): void {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}
