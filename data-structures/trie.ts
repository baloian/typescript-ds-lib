import { BaseCollection } from './base-collection';
import { Utils } from './utils';

export interface Trie<K, V, TToken = string> {
  insert(key: K, value: V): void;
  find(key: K): V | undefined;
  has(key: K): boolean;
  remove(key: K): boolean;
  hasPrefix(prefix: K): boolean;
  valuesWithPrefix(prefix: K): V[];
  entriesWithPrefix(prefix: K): [K, V][];
  forEach(callback: (key: K, value: V) => void): void;
}

interface TrieNode<TToken, V> {
  children: Map<TToken, TrieNode<TToken, V>>;
  value: V | undefined;
  isTerminal: boolean;
}

export interface TrieOptions<K, TToken> {
  tokenize?: (key: K) => ReadonlyArray<TToken>;
  detokenize?: (tokens: ReadonlyArray<TToken>) => K;
}

export class Trie<K = string, V = unknown, TToken = string>
  extends BaseCollection<V>
  implements Trie<K, V, TToken>
{
  private readonly root: TrieNode<TToken, V>;
  private count: number;
  private readonly tokenizeKey: (key: K) => ReadonlyArray<TToken>;
  private readonly detokenizeKey: (tokens: ReadonlyArray<TToken>) => K;

  constructor(options: TrieOptions<K, TToken> = {}) {
    super();
    this.root = this.createNode();
    this.count = 0;
    this.tokenizeKey = options.tokenize ?? this.defaultTokenize;
    this.detokenizeKey = options.detokenize ?? this.defaultDetokenize;
  }

  insert(key: K, value: V): void {
    const tokens: ReadonlyArray<TToken> = this.tokenizeKey(key);
    let node: TrieNode<TToken, V> = this.root;
    for (let i = 0; i < tokens.length; i++) {
      const token: TToken = tokens[i];
      let next: TrieNode<TToken, V> | undefined = node.children.get(token);
      if (!next) {
        next = this.createNode();
        node.children.set(token, next);
      }
      node = next;
    }
    if (!node.isTerminal) {
      this.count++;
      node.isTerminal = true;
    }
    node.value = value;
  }

  find(key: K): V | undefined {
    const node: TrieNode<TToken, V> | undefined = this.findNode(this.tokenizeKey(key));
    if (!node || !node.isTerminal) {
      return undefined;
    }
    return node.value;
  }

  has(key: K): boolean {
    const node: TrieNode<TToken, V> | undefined = this.findNode(this.tokenizeKey(key));
    return !!node && node.isTerminal;
  }

  remove(key: K): boolean {
    const tokens: ReadonlyArray<TToken> = this.tokenizeKey(key);
    const removed: { value: boolean } = { value: false };
    this.removeRecursive(this.root, tokens, 0, removed);
    if (removed.value) {
      this.count--;
    }
    return removed.value;
  }

  hasPrefix(prefix: K): boolean {
    return this.findNode(this.tokenizeKey(prefix)) !== undefined;
  }

  valuesWithPrefix(prefix: K): V[] {
    const prefixNode: TrieNode<TToken, V> | undefined = this.findNode(this.tokenizeKey(prefix));
    if (!prefixNode) {
      return [];
    }
    const values: V[] = [];
    this.collect(prefixNode, [], (_, value) => {
      values.push(value);
    });
    return values;
  }

  entriesWithPrefix(prefix: K): [K, V][] {
    const prefixTokens: ReadonlyArray<TToken> = this.tokenizeKey(prefix);
    const prefixNode: TrieNode<TToken, V> | undefined = this.findNode(prefixTokens);
    if (!prefixNode) {
      return [];
    }
    const entries: [K, V][] = [];
    this.collect(prefixNode, [...prefixTokens], (tokens, value) => {
      entries.push([this.detokenizeKey(tokens), value]);
    });
    return entries;
  }

  forEach(callback: (key: K, value: V) => void): void {
    this.collect(this.root, [], (tokens, value) => {
      callback(this.detokenizeKey(tokens), value);
    });
  }

  size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  clear(): void {
    this.root.children.clear();
    this.root.value = undefined;
    this.root.isTerminal = false;
    this.count = 0;
  }

  equals(other: Trie<K, V, TToken>): boolean {
    if (!other || !(other instanceof Trie)) {
      return false;
    }
    if (this.size() !== other.size()) {
      return false;
    }
    let isEqual: boolean = true;
    this.forEach((key, value) => {
      if (!Utils.equals(value, other.find(key))) {
        isEqual = false;
      }
    });
    return isEqual;
  }

  private createNode(): TrieNode<TToken, V> {
    return {
      children: new Map<TToken, TrieNode<TToken, V>>(),
      value: undefined,
      isTerminal: false
    };
  }

  private findNode(tokens: ReadonlyArray<TToken>): TrieNode<TToken, V> | undefined {
    let node: TrieNode<TToken, V> | undefined = this.root;
    for (let i = 0; i < tokens.length; i++) {
      if (!node) {
        return undefined;
      }
      node = node.children.get(tokens[i]);
    }
    return node;
  }

  private removeRecursive(
    node: TrieNode<TToken, V>,
    tokens: ReadonlyArray<TToken>,
    depth: number,
    removed: { value: boolean }
  ): boolean {
    if (depth === tokens.length) {
      if (!node.isTerminal) {
        return false;
      }
      node.isTerminal = false;
      node.value = undefined;
      removed.value = true;
      return node.children.size === 0;
    }
    const token: TToken = tokens[depth];
    const child: TrieNode<TToken, V> | undefined = node.children.get(token);
    if (!child) {
      return false;
    }
    const shouldDeleteChild: boolean = this.removeRecursive(child, tokens, depth + 1, removed);
    if (shouldDeleteChild) {
      node.children.delete(token);
    }
    return !node.isTerminal && node.children.size === 0;
  }

  private collect(
    node: TrieNode<TToken, V>,
    tokens: TToken[],
    callback: (tokens: ReadonlyArray<TToken>, value: V) => void
  ): void {
    if (node.isTerminal) {
      callback(tokens, node.value as V);
    }
    for (const [token, child] of node.children) {
      tokens.push(token);
      this.collect(child, tokens, callback);
      tokens.pop();
    }
  }

  private defaultTokenize = (key: K): ReadonlyArray<TToken> => {
    if (typeof key === 'string') {
      return Array.from(key) as unknown as TToken[];
    }
    throw new Error('Trie tokenization is missing. Provide options.tokenize for non-string keys.');
  };

  private defaultDetokenize = (tokens: ReadonlyArray<TToken>): K => {
    if (tokens.length === 0) {
      return '' as K;
    }
    if (typeof tokens[0] === 'string') {
      return (tokens as unknown as string[]).join('') as K;
    }
    throw new Error('Trie detokenization is missing. Provide options.detokenize for non-string keys.');
  };
}
