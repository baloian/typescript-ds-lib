import { HashTableUtils } from './hash-table-utils';


export interface HashTable<K, V> {
  insert(key: K, value: V): void;
  get(key: K): V | undefined;
  remove(key: K): boolean;
  size(): number;
  isEmpty(): boolean;
  clear(): void;
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


export class HashTable<K, V> implements HashTable<K, V> {
  private table: Array<HashNode<K, V> | null>;
  private count: number;
  private readonly capacity: number;

  constructor(capacity: number = 4096) {
    // Handle negative or zero capacity by using default capacity
    this.capacity = capacity <= 0 ? 4096 : capacity;
    this.table = new Array(this.capacity).fill(null);
    this.count = 0;
  }

  insert(key: K, value: V): void {
    const index = HashTableUtils.hash<K>(key, this.capacity);
    const newNode = new HashNode<K, V>(key, value);
    // Handle empty bucket case
    if (!this.table[index]) {
      this.table[index] = newNode;
      this.count++;
      return;
    }
    // Check first node for key match
    if (HashTableUtils.keysEqual<K>(this.table[index]!.key, key)) {
      this.table[index]!.value = value;
      return;
    }
    // Traverse chain to find key or last node
    let current = this.table[index]!;
    while (current.next) {
      if (HashTableUtils.keysEqual<K>(current.next.key, key)) {
        current.next.value = value;
        return;
      }
      current = current.next;
    }
    // Key not found, append new node
    current.next = newNode;
    this.count++;
  }

  get(key: K): V | undefined {
    const index = HashTableUtils.hash<K>(key, this.capacity);
    let current = this.table[index];
    while (current) {
      if (HashTableUtils.keysEqual<K>(current.key, key)) {
        return current.value;
      }
      current = current.next;
    }
    return undefined;
  }

  remove(key: K): boolean {
    const index = HashTableUtils.hash<K>(key, this.capacity);
    let current = this.table[index];
    let prev: HashNode<K, V> | null = null;
    while (current) {
      if (HashTableUtils.keysEqual<K>(current.key, key)) {
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
}
