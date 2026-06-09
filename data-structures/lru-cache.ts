import { BaseCollection } from './base-collection';
import { DoublyLinkedList, DoublyLinkedListNode } from './doubly-linked-list';
import { HashTable } from './hash-table';
import { Utils } from './utils';

interface CacheEntry<K, V> {
  key: K;
  value: V;
}

export interface LRUCache<K, V> {
  get(key: K): V | undefined;
  put(key: K, value: V): void;
  has(key: K): boolean;
  remove(key: K): boolean;
  peek(key: K): V | undefined;
  capacity(): number;
}

export class LRUCache<K, V> extends BaseCollection<V> implements LRUCache<K, V> {
  private readonly maxCapacity: number;
  private readonly map: HashTable<K, DoublyLinkedListNode<CacheEntry<K, V>>>;
  private readonly order: DoublyLinkedList<CacheEntry<K, V>>;

  constructor(capacity: number) {
    super();
    if (capacity <= 0) {
      throw new Error('LRU cache capacity must be greater than 0');
    }
    this.maxCapacity = capacity;
    this.map = new HashTable<K, DoublyLinkedListNode<CacheEntry<K, V>>>(capacity * 2);
    this.order = new DoublyLinkedList<CacheEntry<K, V>>();
  }

  get(key: K): V | undefined {
    const node = this.map.get(key);
    if (!node) {
      return undefined;
    }
    this.order.moveToFront(node);
    return node.value.value;
  }

  put(key: K, value: V): void {
    const existing = this.map.get(key);
    if (existing) {
      existing.value.value = value;
      this.order.moveToFront(existing);
      return;
    }

    if (this.order.size() >= this.maxCapacity) {
      const evicted = this.order.popBack();
      if (evicted) {
        this.map.remove(evicted.key);
      }
    }

    const node = this.order.pushFront({ key, value });
    this.map.insert(key, node);
  }

  has(key: K): boolean {
    return this.map.get(key) !== undefined;
  }

  remove(key: K): boolean {
    const node = this.map.get(key);
    if (!node) {
      return false;
    }
    this.order.removeNode(node);
    this.map.remove(key);
    return true;
  }

  peek(key: K): V | undefined {
    const node = this.map.get(key);
    return node?.value.value;
  }

  capacity(): number {
    return this.maxCapacity;
  }

  size(): number {
    return this.order.size();
  }

  isEmpty(): boolean {
    return this.order.isEmpty();
  }

  clear(): void {
    this.map.clear();
    this.order.clear();
  }

  forEach(callback: (key: K, value: V) => void): void {
    this.order.forEach((entry) => callback(entry.key, entry.value));
  }

  equals(other: LRUCache<K, V>): boolean {
    if (!other || !(other instanceof LRUCache)) {
      return false;
    }
    if (this.maxCapacity !== other.maxCapacity || this.size() !== other.size()) {
      return false;
    }
    let isEqual = true;
    this.map.forEach((key, node) => {
      if (!other.has(key) || !Utils.equals(node.value.value, other.peek(key))) {
        isEqual = false;
      }
    });
    return isEqual;
  }
}
