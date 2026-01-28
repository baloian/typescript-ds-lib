import { HashUtils } from './hash-utils';
import { BaseCollection } from './base-collection';
import { Utils } from './utils';

export interface HashTable<K, V> {
  insert(key: K, value: V): void;
  get(key: K): V | undefined;
  remove(key: K): boolean;
  forEach(callback: (key: K, value: V) => void): void;
}

class HashNode<K, V> {
  key: K;
  value: V;
  next: HashNode<K, V> | null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

export class HashTable<K, V> extends BaseCollection<V> implements HashTable<K, V> {
  private table: Array<HashNode<K, V> | null>;
  private count: number;
  private readonly capacity: number;

  constructor(capacity: number = 4096) {
    super();
    // Handle negative or zero capacity by using default capacity
    this.capacity = capacity <= 0 ? 4096 : capacity;
    this.table = new Array(this.capacity).fill(null);
    this.count = 0;
  }

  insert(key: K, value: V): void {
    const index: number = HashUtils.hash<K>(key, this.capacity);
    // Handle empty bucket case.
    if (!this.table[index]) {
      this.table[index] = new HashNode<K, V>(key, value);
      this.count++;
      return;
    }
    // Check first node for key match. If it matches, update the value.
    if (Utils.equals<K>(this.table[index]!.key, key)) {
      this.table[index]!.value = value;
      return;
    }
    // Traverse chain to find key or last node. If it matches, update the value.
    let current: HashNode<K, V> | null = this.table[index];
    while (current?.next) {
      if (Utils.equals<K>(current.next.key, key)) {
        current.next.value = value;
        return;
      }
      current = current.next;
    }
    // Key not found, append new node.
    current.next = new HashNode<K, V>(key, value);
    this.count++;
  }

  get(key: K): V | undefined {
    const index: number = HashUtils.hash<K>(key, this.capacity);
    let current: HashNode<K, V> | null = this.table[index];
    while (current) {
      if (Utils.equals<K>(current.key, key)) {
        return current.value;
      }
      current = current.next;
    }
    return undefined;
  }

  remove(key: K): boolean {
    const index: number = HashUtils.hash<K>(key, this.capacity);
    let current: HashNode<K, V> | null = this.table[index];
    let prev: HashNode<K, V> | null = null;
    while (current) {
      if (Utils.equals<K>(current.key, key)) {
        if (prev) {
          prev.next = current.next;
        } else {
          this.table[index] = current.next;
        }
        this.count--;
        return true;
      }
      prev = current;
      current = current.next;
    }
    return false;
  }

  forEach(callback: (key: K, value: V) => void): void {
    for (const node of this.table) {
      let current: HashNode<K, V> | null = node;
      while (current) {
        callback(current.key, current.value);
        current = current.next;
      }
    }
  }

  size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  clear(): void {
    this.table = new Array(this.capacity).fill(null);
    this.count = 0;
  }

  /**
   * Checks if two hash tables are equal.
   */
  equals(other: HashTable<K, V>): boolean {
    if (!other || !(other instanceof HashTable)) {
      return false;
    }
    if (this.size() !== other.size()) {
      return false;
    }
    // Check each key-value pair in this table exists in other table
    let isEqual = true;
    this.forEach((key, value) => {
      const otherValue = other.get(key);
      if (!Utils.equals(value, otherValue)) {
        isEqual = false;
      }
    });
    return isEqual;
  }
}
