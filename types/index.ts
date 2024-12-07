export interface StackTy<T> {
  push(element: T): void;
  pop(): T | undefined;
  top(): T | undefined;
  empty(): boolean;
  size(): number;
  clear(): void;
}

export interface QueueTy<T> {
  push(element: T): void;
  pop(): T | undefined;
  front(): T | undefined;
  empty(): boolean;
  size(): number;
  clear(): void;
}

export interface PriorityQueueTy<T> {
  push(element: T, priority: number): void;
  pop(): T | undefined;
  front(): T | undefined;
  empty(): boolean;
  size(): number;
  clear(): void;
}

export interface BinarySearchTreeTy<T> {
  insert(element: T): void;
  remove(element: T): void;
  find(element: T): boolean;
  min(): T | undefined;
  max(): T | undefined;
  empty(): boolean;
  clear(): void;
  count(): number;
}

export interface DequeTy<T> {
  pushFront(element: T): void;
  pushBack(element: T): void;
  popFront(): T | undefined;
  popBack(): T | undefined;
  front(): T | undefined;
  back(): T | undefined;
  empty(): boolean;
  size(): number;
  clear(): void;
}

export interface LinkedListTy<T> {
  pushBack(element: T): void;
  pushFront(element: T): void;
  insert(element: T, position: number): boolean;
  removeIf(condition: (element: T) => boolean): boolean;
  removeAt(position: number): T | undefined;
  get(position: number): T | undefined;
  empty(): boolean;
  size(): number;
  clear(): void;
}

export interface SetTy<T> {
  insert(element: T): void;
  remove(element: T): void;
  find(element: T): boolean;
  empty(): boolean;
  size(): number;
  clear(): void;
}

export interface MapTy<K, V> {
  insert(key: K, value: V): void;
  find(key: K): V | undefined;
  delete(key: K): void;
  clear(): void;
  empty(): boolean;
  size(): number;
}

export interface RedBlackTreeTy<T> {
  insert(value: T): void;
  remove(value: T): void;
  find(value: T): T | undefined;
  min(): T | undefined;
  max(): T | undefined;
  empty(): boolean;
  size(): number;
  clear(): void;
}

