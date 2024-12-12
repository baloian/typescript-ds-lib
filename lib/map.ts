import { Comparator } from '../types';
import { RedBlackTree } from './red-black-tree';


export interface Map<K, V> {
  insert(key: K, value: V): void;
  find(key: K): V | undefined;
  delete(key: K): void;
  remove(key: K): void;
  forEach(callback: (key: K, value: V) => void): void;
  clear(): void;
  isEmpty(): boolean;
  size(): number;
}


export class Map<K, V> implements Map<K, V> {
  private rbTree: RedBlackTree<K, V>;

  constructor(comparator: Comparator<K> = (a: K, b: K) => a < b) {
    this.rbTree = new RedBlackTree<K, V>(comparator);
  }

  insert(key: K, value: V): void {
    this.rbTree.insert(key, value);
  }

  find(key: K): V | undefined {
    return this.rbTree.find(key);
  }

  delete(key: K): void {
    this.rbTree.remove(key);
  }

  remove(key: K): void {
    this.rbTree.remove(key);
  }

  clear(): void {
    this.rbTree.clear();
  }

  size(): number {
    return this.rbTree.size();
  }

  isEmpty(): boolean {
    return this.rbTree.isEmpty();
  }

  forEach(callback: (key: K, value: V) => void): void {
    this.rbTree.forEach(callback);
  }
}
