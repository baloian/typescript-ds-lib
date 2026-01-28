import { BaseCollection } from './base-collection';
import { Utils } from './utils';

export interface LinkedList<T> {
  pushBack(element: T): void;
  pushFront(element: T): void;
  popBack(): T | undefined;
  popFront(): T | undefined;
  front(): T | undefined;
  back(): T | undefined;
  insert(element: T, position: number): boolean;
  insertBefore(element: T, condition: (element: T) => boolean): boolean;
  insertAfter(element: T, condition: (element: T) => boolean): boolean;
  removeIf(condition: (element: T) => boolean): boolean;
  removeAt(position: number): T | undefined;
  forEach(callback: (element: T) => void): void;
  get(position: number): T | undefined;
}

class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<T> extends BaseCollection<T> implements LinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private length: number;

  constructor() {
    super();
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Returns the first element in the list without removing it, or undefined if list is empty
   */
  front(): T | undefined {
    return this.head?.value;
  }

  /**
   * Returns the last element in the list without removing it, or undefined if list is empty
   */
  back(): T | undefined {
    return this.tail?.value;
  }

  /**
   * Adds an element to the end of the list
   */
  pushBack(element: T): void {
    const newNode: Node<T> = new Node(element);
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
    const newNode: Node<T> = new Node(element);
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
   * Removes and returns the last element from the list, or undefined if list is empty
   */
  popBack(): T | undefined {
    if (!this.head) {
      return undefined;
    }
    if (this.length === 1) {
      const value = this.head.value;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return value;
    }
    let current: Node<T> | null = this.head;
    while (current?.next !== this.tail) {
      current = current!.next;
    }
    const value = this.tail!.value;
    current.next = null;
    this.tail = current;
    this.length--;
    return value;
  }

  /**
   * Removes and returns the first element from the list, or undefined if list is empty
   */
  popFront(): T | undefined {
    if (!this.head) {
      return undefined;
    }
    const value = this.head.value;
    this.head = this.head.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return value;
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
    const newNode: Node<T> = new Node(element);
    let current: Node<T> | null = this.head;
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
   * Inserts an element before the first element that satisfies the condition. Returns true if successful, false if no matching element found
   */
  insertBefore(element: T, condition: (element: T) => boolean): boolean {
    if (!this.head) {
      return false;
    }
    if (condition(this.head.value)) {
      this.pushFront(element);
      return true;
    }
    let current: Node<T> | null = this.head;
    while (current?.next !== null) {
      if (condition(current.next.value)) {
        const newNode: Node<T> = new Node(element);
        newNode.next = current.next;
        current.next = newNode;
        this.length++;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  /**
   * Inserts an element after the first element that satisfies the condition. Returns true if successful, false if no matching element found
   */
  insertAfter(element: T, condition: (element: T) => boolean): boolean {
    let current: Node<T> | null = this.head;
    while (current !== null) {
      if (condition(current.value)) {
        const newNode: Node<T> = new Node(element);
        newNode.next = current.next;
        current.next = newNode;
        if (current === this.tail) {
          this.tail = newNode;
        }
        this.length++;
        return true;
      }
      current = current.next;
    }
    return false;
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
      current = current!.next;
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
   * Executes a provided function once for each element in the list
   */
  forEach(callback: (element: T) => void): void {
    let current: Node<T> | null = this.head;
    while (current !== null) {
      callback(current.value);
      current = current.next;
    }
  }

  /**
   * Returns the element at the specified position without removing it. Returns undefined if position is invalid
   */
  get(position: number): T | undefined {
    if (position < 0 || position >= this.length) {
      return undefined;
    }
    // Optimize for front element
    if (position === 0) return this.head!.value;
    // Optimize for back element
    if (position === this.length - 1) return this.tail!.value;
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

  /**
   * Checks if two lists are equal.
   */
  equals(other: LinkedList<T>): boolean {
    if (!other || !(other instanceof LinkedList)) return false;
    if (this.size() !== other.size()) return false;
    let current: Node<T> | null = this.head;
    let otherCurrent: Node<T> | null = other.head;
    while (current !== null) {
      if (!Utils.equals(current.value, otherCurrent!.value)) return false;
      current = current.next;
      otherCurrent = otherCurrent!.next;
    }
    return true;
  }
}
