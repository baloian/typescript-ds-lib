import { MapTy } from '../types';
import { RedBlackTree } from './red-black-tree';

interface Entry<K, V> {
  key: K;
  value: V;
}

export class Map<K, V> implements MapTy<K, V> {
  private rbTree: RedBlackTree<Entry<K, V>>;

  constructor() {
    this.rbTree = new RedBlackTree<Entry<K, V>>();
  }

  insert(key: K, value: V): void {
    const entry: Entry<K, V> = { key, value };
    this.rbTree.insert(entry);
  }

  find(key: K): V | undefined {
    const current = this.rbTree.find({ key } as Entry<K, V>);
    return current ? current.value : undefined;
  }

  delete(key: K): void {
    this.rbTree.remove({ key } as Entry<K, V>);
  }

  clear(): void {
    this.rbTree.clear();
  }

  size(): number {
    return this.rbTree.size();
  }

  empty(): boolean {
    return this.rbTree.empty();
  }
}
