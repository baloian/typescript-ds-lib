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

  constructor(capacity: number = 32) {
    this.table = new Array(capacity).fill(null);
    this.count = 0;
    this.capacity = capacity;
  }

  private hash(key: K): number {
    if (typeof (key as any).hashCode === 'function') {
      return (key as any).hashCode();
    }

    // Handle numbers directly without string conversion.
    // For numbers that fit in 64 bits, use Knuth's multiplicative method. For larger numbers,
    // convert to string and use string hashing.
    if (typeof key === 'number' && Number.isSafeInteger(key)) {
      const knuthConstant = 2654435761;
      return (Math.abs(key * knuthConstant) >>> 0) % this.capacity;
    }

    let stringKey: string;
    if (typeof key === 'object') {
      if (typeof (key as any).toString === 'function') {
        stringKey = (key as any).toString();
      } else {
        stringKey = JSON.stringify(key);
      }
    } else if (typeof key === 'string') {
      stringKey = key;
    } else if (typeof key === 'function') {
      stringKey = key.toString();
    } else if (typeof key === 'symbol') {
      stringKey = key.toString();
    } else if (key === null || key === undefined) {
      stringKey = 'null';
    } else {
      stringKey = String(key);
    }
    let hash = 0;
    // DJB2 hash algorithm
    for (let i = 0; i < stringKey.length; i++) {
      hash = ((hash << 5) + hash) + stringKey.charCodeAt(i);
      hash = hash >>> 0; // Convert to 32-bit unsigned integer
    }
    return hash % this.capacity;
  }

  insert(key: K, value: V): void {
    const index = this.hash(key);
    const newNode = new HashNode(key, value);
    if (!this.table[index]) {
      this.table[index] = newNode;
      this.count++;
      return;
    }
    let current = this.table[index];
    while (current) {
      if (this.keysEqual(current.key, key)) {
        current.value = value;
        return;
      }
      if (!current.next) {
        current.next = newNode;
        this.count++;
        return;
      }
      current = current.next;
    }
  }

  get(key: K): V | undefined {
    const index = this.hash(key);
    let current = this.table[index];
    while (current) {
      if (this.keysEqual(current.key, key)) {
        return current.value;
      }
      current = current.next;
    }
    return undefined;
  }

  remove(key: K): boolean {
    const index = this.hash(key);
    let current = this.table[index];
    let prev: HashNode<K, V> | null = null;
    while (current) {
      if (this.keysEqual(current.key, key)) {
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

  private keysEqual(key1: K, key2: K): boolean {
    // Check if keys have equals method and use it for comparison
    if (typeof (key1 as any).equals === 'function') {
      return (key1 as any).equals(key2);
    }
    if (key1 === key2) return true;
    if (key1 == null || key2 == null) return false;

    if (typeof key1 !== 'object' && typeof key2 !== 'object') {
      return key1 === key2;
    }
    if (key1 instanceof Date && key2 instanceof Date) {
      return key1.getTime() === key2.getTime();
    }
    if (key1 instanceof RegExp && key2 instanceof RegExp) {
      return key1.toString() === key2.toString();
    }
    if (Array.isArray(key1) && Array.isArray(key2)) {
      return key1.length === key2.length && 
             key1.every((val, idx) => this.keysEqual(val, key2[idx]));
    }
    if (typeof key1 === 'object' && typeof key2 === 'object') {
      const keys1 = Object.keys(key1);
      const keys2 = Object.keys(key2);
      return keys1.length === keys2.length &&
             keys1.every(k => k in key2 && this.keysEqual((key1 as any)[k], (key2 as any)[k]));
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
