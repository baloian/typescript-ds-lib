export type Comparator<T> = (a: T, b: T) => boolean;

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

export interface RedBlackTreeTy<K, V> {
  insert(key: K, value: V): void;
  remove(key: K): void;
  find(key: K): V | undefined;
  min(): V | undefined;
  max(): V | undefined;
  empty(): boolean;
  size(): number;
  clear(): void;
}

export interface HashTableTy<K, V> {
  insert(key: K, value: V): void;
  get(key: K): V | undefined;
  remove(key: K): boolean;
  size(): number;
  empty(): boolean;
  clear(): void;
}

export interface MatrixTy<T> {
  get(row: number, col: number): T | undefined;
  set(row: number, col: number, value: T): void;
  rows(): number;
  columns(): number;
  fill(value: T): void;
  clear(): void;
  empty(): boolean;
  size(): number;
  transpose(): MatrixTy<T>;
  add(other: MatrixTy<T>): MatrixTy<T>;
  subtract(other: MatrixTy<T>): MatrixTy<T>;
  multiply(other: MatrixTy<T>): MatrixTy<T>;
  map(fn: (value: T, row: number, col: number) => T): MatrixTy<T>;
  forEach(fn: (value: T, row: number, col: number) => void): void;
  clone(): MatrixTy<T>;
  toArray(): T[][];
  getRow(row: number): T[];
  getColumn(col: number): T[];
  setRow(row: number, values: T[]): void;
  setColumn(col: number, values: T[]): void;
  resize(rows: number, cols: number): void;
}
