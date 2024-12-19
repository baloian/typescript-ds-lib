import { BaseCollection } from './base-collection';
import { HashUtils } from './hash-utils';


export interface Set<T> {
  insert(element: T): void;
  insertList(elements: T[]): void;
  remove(element: T): void;
  find(element: T): boolean;
  forEach(callback: (element: T) => void): void;
}


class Node<V> {
  value: V;
  next: Node<V> | null;

  constructor(value: V) {
    this.value = value;
    this.next = null;
  }
}


export class Set<T> extends BaseCollection<T> implements Set<T> {
  private table: Array<Node<T> | null>;
  private count: number;
  private readonly capacity: number;

  constructor(capacity: number = 8192) {
    super();
    this.capacity = capacity <= 0 ? 8192 : capacity;
    this.table = new Array(this.capacity).fill(null);
    this.count = 0;
  }

  /**
   * Adds a value to the set if it's not already present.
   */
  insert(value: T): void {
    const index: number = HashUtils.hash<T>(value, this.capacity);
    // Handle empty bucket case.
    if (!this.table[index]) {
      this.table[index] = new Node<T>(value);
      this.count++;
      return;
    }
    // Check first node for value match. If it matches, do nothing.
    if (HashUtils.equals<T>(this.table[index]!.value, value)) return;
    // Traverse chain to find value or last node. If it matches, do nothing.
    let current: Node<T> | null = this.table[index];
    while (current?.next) {
      if (HashUtils.equals<T>(current.next.value, value)) return;
      current = current.next;
    }
    // Value not found, append new node.
    current.next = new Node<T>(value);
    this.count++;
  }

  /**
   * Adds multiple values to the set if they're not already present.
   */
  insertList(values: T[]): void {
    for (const value of values) {
      this.insert(value);
    }
  }

  /**
   * Checks if a value exists in the set.
   */
  find(value: T): boolean {
    const index: number = HashUtils.hash<T>(value, this.capacity);
    let current: Node<T> | null = this.table[index];
    while (current) {
      if (HashUtils.equals<T>(current.value, value)) return true;
      current = current.next;
    }
    return false;
  }

  /**
   * Removes a value from the set.
   */
  remove(value: T): void {
    const index: number = HashUtils.hash<T>(value, this.capacity);
    let current: Node<T> | null = this.table[index];
    let prev: Node<T> | null = null;
    while (current) {
      if (HashUtils.equals<T>(current.value, value)) {
        if (prev) {
          prev.next = current.next;
        } else {
          this.table[index] = current.next;
        }
        this.count--;
        return;
      }
      prev = current;
      current = current.next;
    }
  }

  /**
   * Removes all elements from the set.
   */
  clear(): void {
    this.table = new Array(this.capacity).fill(null);
    this.count = 0;
  }

  /**
   * Returns true if the set contains no elements.
   */
  isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   * Returns the number of elements in the set.
   */
  size(): number {
    return this.count;
  }
}
