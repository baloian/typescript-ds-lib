import { BaseCollection } from './base-collection';
import { Utils } from './utils';

export class DoublyLinkedListNode<T> {
  value: T;
  prev: DoublyLinkedListNode<T> | null;
  next: DoublyLinkedListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

export interface DoublyLinkedList<T> {
  pushBack(element: T): DoublyLinkedListNode<T>;
  pushFront(element: T): DoublyLinkedListNode<T>;
  popBack(): T | undefined;
  popFront(): T | undefined;
  removeNode(node: DoublyLinkedListNode<T>): void;
  moveToFront(node: DoublyLinkedListNode<T>): void;
  front(): T | undefined;
  back(): T | undefined;
  forEach(callback: (element: T) => void): void;
}

export class DoublyLinkedList<T> extends BaseCollection<T> implements DoublyLinkedList<T> {
  private head: DoublyLinkedListNode<T> | null;
  private tail: DoublyLinkedListNode<T> | null;
  private length: number;

  constructor() {
    super();
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  front(): T | undefined {
    return this.head?.value;
  }

  back(): T | undefined {
    return this.tail?.value;
  }

  pushBack(element: T): DoublyLinkedListNode<T> {
    const newNode = new DoublyLinkedListNode(element);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return newNode;
  }

  pushFront(element: T): DoublyLinkedListNode<T> {
    const newNode = new DoublyLinkedListNode(element);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
    return newNode;
  }

  popBack(): T | undefined {
    if (!this.tail) {
      return undefined;
    }
    const value = this.tail.value;
    this.removeNode(this.tail);
    return value;
  }

  popFront(): T | undefined {
    if (!this.head) {
      return undefined;
    }
    const value = this.head.value;
    this.removeNode(this.head);
    return value;
  }

  removeNode(node: DoublyLinkedListNode<T>): void {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
    node.prev = null;
    node.next = null;
    this.length--;
  }

  moveToFront(node: DoublyLinkedListNode<T>): void {
    if (node === this.head) {
      return;
    }
    this.removeNode(node);
    node.next = this.head;
    node.prev = null;
    if (this.head) {
      this.head.prev = node;
    } else {
      this.tail = node;
    }
    this.head = node;
    this.length++;
  }

  forEach(callback: (element: T) => void): void {
    let current: DoublyLinkedListNode<T> | null = this.head;
    while (current !== null) {
      callback(current.value);
      current = current.next;
    }
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  size(): number {
    return this.length;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  equals(other: DoublyLinkedList<T>): boolean {
    if (!other || !(other instanceof DoublyLinkedList)) {
      return false;
    }
    if (this.size() !== other.size()) {
      return false;
    }
    let current: DoublyLinkedListNode<T> | null = this.head;
    let otherCurrent: DoublyLinkedListNode<T> | null = other.head;
    while (current !== null) {
      if (!Utils.equals(current.value, otherCurrent!.value)) {
        return false;
      }
      current = current.next;
      otherCurrent = otherCurrent!.next;
    }
    return true;
  }
}
