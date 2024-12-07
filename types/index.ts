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

