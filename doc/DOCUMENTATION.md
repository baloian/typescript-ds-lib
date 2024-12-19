# TypeScript Data Structure Library Documentation
This library provides a collection of commonly used data structures implemented in TypeScript. Each data structure is designed to be type-safe and efficient.
- [Binary Search Tree](https://github.com/baloian/typescript-ds-lib/blob/master/doc/DOCUMENTATION.md#binary-search-tree)
- [Deque](https://github.com/baloian/typescript-ds-lib/blob/master/doc/DOCUMENTATION.md#deque)
- [Hash Table](https://github.com/baloian/typescript-ds-lib/blob/master/doc/DOCUMENTATION.md#hash-table)
- [Heap](https://github.com/baloian/typescript-ds-lib/blob/master/doc/DOCUMENTATION.md#heap)
- [Linked List](https://github.com/baloian/typescript-ds-lib/blob/master/doc/DOCUMENTATION.md#linked-list)
- [Map](https://github.com/baloian/typescript-ds-lib/blob/master/doc/DOCUMENTATION.md#map)
- [Matrix](https://github.com/baloian/typescript-ds-lib/blob/master/doc/DOCUMENTATION.md#matrix)  
- [Priority Queue](https://github.com/baloian/typescript-ds-lib/blob/master/doc/DOCUMENTATION.md#priority-queue)
- [Queue](https://github.com/baloian/typescript-ds-lib/blob/master/doc/DOCUMENTATION.md#queue)
- [Red-Black Tree](https://github.com/baloian/typescript-ds-lib/blob/master/doc/DOCUMENTATION.md#red-black-tree)
- [Set](https://github.com/baloian/typescript-ds-lib/blob/master/doc/DOCUMENTATION.md#set)
- [Stack](https://github.com/baloian/typescript-ds-lib/blob/master/doc/DOCUMENTATION.md#stack)

# Binary Search Tree
A binary search tree (BST) implementation in TypeScript that stores values in an ordered tree structure, with smaller values to the left and larger values to the right.

## Constructor
`constructor(comparator: Comparator<T> = (a: T, b: T) => a < b)` - Creates a new binary search tree with the given comparator.

## Methods
`insert(value: T)` - Inserts a new value into the binary search tree.   
`find(value: T)` - Searches for a value in the binary search tree.  
`min()` - Returns the minimum value stored in the tree.  
`max()` - Returns the maximum value stored in the tree.  
`remove(value: T)` - Removes a value from the binary search tree if it exists.  
`forEach(callback: (element: T) => void, traversal: 'inorder' | 'preorder' | 'postorder' = 'inorder')` - Executes a callback function for each element in the BST.  
`isEmpty()` - Checks if the binary search tree is empty.  
`clear()` - Removes all nodes from the binary search tree.  
`size()` - Returns the total number of nodes in the binary search tree.  

### Example Usage
```typescript
import { BinarySearchTree } from 'typescript-ds-lib';

const bst: BinarySearchTree<number> = new BinarySearchTree<number>();

bst.insert(10);
bst.insert(5);
bst.insert(15);

console.log(bst.find(5));   // true
console.log(bst.min());     // 5
console.log(bst.max());     // 15
```


# Deque
A double-ended queue (Deque) implementation in TypeScript that allows insertion and deletion of elements from both ends of the queue.

## Constructor
`constructor()` - Creates a new deque.

## Methods
`pushFront(value: T)` - Adds an element to the front of the deque.  
`pushBack(value: T)` - Adds an element to the back of the deque.  
`popFront()` - Removes and returns the front element of the deque.  
`popBack()` - Removes and returns the back element of the deque.  
`front()` - Returns the front element without removing it.  
`back()` - Returns the back element without removing it.  
`isEmpty()` - Checks if the deque is empty.  
`clear()` - Removes all elements from the deque.  
`size()` - Returns the total number of elements in the deque.  

### Example Usage
```typescript
import { Deque } from 'typescript-ds-lib';

const deque: Deque<number> = new Deque<number>();

deque.pushBack(1);    // deque: [1]
deque.pushFront(2);   // deque: [2,1]
deque.pushBack(3);    // deque: [2,1,3]

console.log(deque.front());  // 2
console.log(deque.back());   // 3
console.log(deque.size());   // 3

deque.popFront();     // deque: [1,3]
deque.popBack();      // deque: [1]
```


# Hash Table
A hash table implementation in TypeScript that provides efficient key-value pair storage and retrieval using a hash function for indexing.

**NOTE:** If a key is an instance of a class that provides a `hashCode()` and/or `equals()` methods, those methods will be used for generating the hash value and comparing keys instead of the default hashing algorithm. This allows for custom hash implementations for complex key types.


## Constructor
`constructor(capacity: number = 4096)` - Creates a new hash table with the specified capacity.

## Methods
`insert(key: K, value: V)` - Inserts or updates a key-value pair in the hash table.  
`get(key: K)` - Retrieves the value associated with the given key.  
`remove(key: K)` - Removes a key-value pair from the hash table.  
`forEach(callback: (key: K, value: V) => void)` - Executes a callback function for each key-value pair in the hash table.  
`isEmpty()` - Checks if the hash table is empty. 
`clear()` - Removes all key-value pairs from the hash table.  
`size()` - Returns the number of key-value pairs in the hash table.  

### Example Usage
```typescript
import { HashTable } from 'typescript-ds-lib';

const hashTable: HashTable<string, number> = new HashTable<string, number>();

hashTable.insert('one', 1);
hashTable.insert('two', 2);
hashTable.insert('three', 3);

console.log(hashTable.get('two'));     // 2
console.log(hashTable.isEmpty());      // false
console.log(hashTable.size());         // 3

hashTable.remove("one");
```


# Heap
A heap implementation in TypeScript that maintains elements in a heap structure, where each element has a priority value determining its position in the heap.

## Constructor
`constructor(comparator: Comparator<T> = (a: T, b: T) => a < b)` - Creates a new heap with the given comparator.

## Methods
`push(value: T)` - Adds an element to the heap.  
`pop()` - Removes and returns the element with the highest priority.  
`top()` - Returns the element with the highest priority without removing it.  
`isEmpty()` - Checks if the heap is empty.  
`clear()` - Removes all elements from the heap.  
`size()` - Returns the number of elements in the heap.  


# Linked List
A singly linked list implementation in TypeScript that stores elements in a sequence of nodes, where each node points to the next node in the sequence.

## Constructor
`constructor()` - Creates a new linked list.

## Methods
`pushBack(value: T)` - Adds a new element to the end of the linked list.  
`pushFront(value: T)` - Adds a new element to the beginning of the linked list.  
`popBack()` - Removes and returns the last element from the linked list.   
`popFront()` - Removes and returns the first element from the linked list.   
`front()` - Returns the first element without removing it.  
`back()` - Returns the last element without removing it.  
`insert(value: T, position: number)` - Inserts a new element at the specified position.  
`insertBefore(value: T, condition: (element: T) => boolean)` - Inserts a new element before the first element that satisfies the condition.  
`insertAfter(value: T, condition: (element: T) => boolean)` - Inserts a new element after the first element that satisfies the condition.  
`removeIf(condition: (element: T) => boolean)` - Removes all elements that satisfy the condition.  
`removeAt(position: number)` - Removes the element at the specified position.  
`forEach(callback: (element: T) => void)` - Applies a function to each element of the linked list.  
`get(position: number)` - Returns the element at the specified position.  
`isEmpty()` - Checks if the linked list is empty.  
`clear()` - Removes all elements from the linked list.  
`size()` - Returns the total number of elements in the linked list.  

### Example Usage
```typescript
import { LinkedList } from 'typescript-ds-lib';

const list: LinkedList<number> = new LinkedList<number>();

list.pushBack(1);     // list: [1]
list.pushBack(2);     // list: [1,2]
list.pushFront(0);    // list: [0,1,2]

console.log(list.get(1));      // 1
console.log(list.size());      // 3

list.removeAt(0);   // list: [1,2]
list.removeAt(1);   // list: [1]
```


# Map
A map implementation in TypeScript that maintains key-value pairs in sorted order based on the keys, implemented as a red-black tree.

## Constructor
`constructor(comparator: Comparator<K> = (a: K, b: K) => a < b)` - Creates a new map with the given comparator.

## Methods
`insert(key: K, value: V)` - Inserts or updates a key-value pair in the map.  
`find(key: K)` - Retrieves the value associated with the given key.  
`remove(key: K)` - Removes a key-value pair from the map.  
`forEach(callback: (key: K, value: V) => void)` - Executes a callback function for each key-value pair in the map.  
`isEmpty()` - Checks if the map is empty.  
`clear()` - Removes all key-value pairs from the map.  
`size()` - Returns the number of key-value pairs in the map.  


### Example Usage
```typescript
import { Map } from 'typescript-ds-lib';

const map: Map<string, number> = new Map<string, number>();

map.insert('apple', 1);
map.insert('banana', 2);
map.insert('cherry', 3);

console.log(map.find('banana'));   // 2
console.log(map.find('apple'));    // 1
console.log(map.size());           // 3

map.delete('apple');
console.log(map.size());           // 2
```


# Priority Queue
A priority queue implementation in TypeScript that maintains elements in a heap structure, where each element has a priority value determining its position in the queue.

## Constructor
`constructor(comparator: Comparator<T> = (a: T, b: T) => a > b)` - Creates a new priority queue with the given comparator .

## Methods
`push(value: T)` - Adds an element to the priority queue.  
`pop()` - Removes and returns the element with the highest priority.  
`front()` - Returns the highest priority element without removing it.  
`isEmpty()` - Checks if the priority queue is empty.  
`clear()` - Removes all elements from the priority queue.  
`size()` - Returns the number of elements in the priority queue.  

### Example Usage
```typescript
import { PriorityQueue } from 'typescript-ds-lib';

const pq: PriorityQueue<number> = new PriorityQueue<number>();

pq.push(10);    // Will be third priority
pq.push(30);    // Will be first priority
pq.push(20);    // Will be second priority

console.log(pq.front()); // 30 (highest value has highest priority)
console.log(pq.size());  // 3

pq.pop();                // Removes 30
console.log(pq.front()); // 20 (next highest value)
```


# Queue
A queue implementation in TypeScript that follows the First-In-First-Out (FIFO) principle, where elements are added to the back and removed from the front of the queue.

## Constructor
`constructor()` - Creates a new queue.

## Methods
`push(value: T)` - Adds an element to the back of the queue.  
`pop()` - Removes and returns the element from the front of the queue.  
`front()` - Returns the front element without removing it.  
`isEmpty()` - Checks if the queue is empty.  
`clear()` - Removes all elements from the queue.  
`size()` - Returns the number of elements in the queue.  

### Example Usage
```typescript
import { Queue } from 'typescript-ds-lib';

const queue: Queue<number> = new Queue<number>();

queue.push(1);    // queue: [1]
queue.push(2);    // queue: [1,2]
queue.push(3);    // queue: [1,2,3]

console.log(queue.front());  // 1
console.log(queue.size());   // 3

queue.pop();                 // queue: [2,3]
console.log(queue.front());  // 2
```


# Red-Black Tree
A self-balancing binary search tree (Red-Black key-value Tree) implementation in TypeScript that maintains balance through color properties and rotation operations, ensuring O(log n) time complexity for basic operations.

## Constructor
`constructor(comparator: Comparator<K> = (a: K, b: K) => a < b)` - Creates a new red-black tree with the given comparator.

## Methods
`insert(key: K, value: V)` - Inserts a new key-value pair into the tree while maintaining red-black properties.  
`remove(key: K)` - Removes a key-value pair from the tree if it exists while maintaining red-black properties.  
`forEach(callback: (key: K, value: V) => void)` - Executes a callback function for each key-value pair in the tree.  
`find(key: K)` - Searches for a key in the tree and returns true if found.  
`min()` - Returns the minimum value stored in the tree.  
`max()` - Returns the maximum value stored in the tree.  
`isEmpty()` - Checks if the tree is empty.  
`clear()` - Removes all nodes from the tree.  
`size()` - Returns the total number of nodes in the tree.  

### Example Usage
```typescript
import { RedBlackTree } from 'typescript-ds-lib';

const rbt: RedBlackTree<number, string> = new RedBlackTree<number, string>();

rbt.insert(10, "ten");
rbt.insert(5, "five");
rbt.insert(15, "fifteen");
rbt.insert(3, "three");
rbt.insert(7, "seven");

console.log(rbt.find(5));   // "five"
console.log(rbt.min());     // "three"
console.log(rbt.max());     // "fifteen"
console.log(rbt.size());    // 5

rbt.remove(5);
console.log(rbt.find(5));   // undefined
```


# Set
A set implementation in TypeScript that maintains a collection of unique elements, implemented as a binary search tree for efficient operations.

## Constructor
`constructor(comparator: Comparator<T> = (a: T, b: T) => a < b)` - Creates a new set with the given comparator.

## Methods
`insert(value: T)` - Adds a new element to the set if it doesn't already exist.  
`insertList(values: T[])` - Adds multiple elements to the set if they don't already exist.  
`remove(value: T)` - Removes an element from the set if it exists.  
`find(value: T)` - Checks if an element exists in the set.  
`forEach(callback: (element: T) => void)` - Executes a callback function for each element in the set.  
`isEmpty()` - Checks if the set is empty.  
`clear()` - Removes all elements from the set.  
`size()` - Returns the number of elements in the set.  

### Example Usage
```typescript
import { Set } from 'typescript-ds-lib';

const set: Set<number> = new Set<number>();

set.insert(1);    // set: {1}
set.insert(2);    // set: {1,2}
set.insert(2);    // set: {1,2} (no duplicate added)
set.insert(3);    // set: {1,2,3}

console.log(set.find(2));  // true
console.log(set.size());   // 3

set.remove(1);             // set: {2,3}
console.log(set.find(1));  // false
```


# Stack
A stack implementation in TypeScript that follows the Last-In-First-Out (LIFO) principle, where elements are added and removed from the same end of the stack.

## Constructor
`constructor()` - Creates a new stack.

## Methods
`push(value: T)` - Adds an element to the top of the stack.  
`pop()` - Removes and returns the element from the top of the stack.  
`top()` - Returns the top element without removing it.  
`isEmpty()` - Checks if the stack is empty.  
`clear()` - Removes all elements from the stack.  
`size()` - Returns the number of elements in the stack.  

### Example Usage
```typescript
import { Stack } from 'typescript-ds-lib';

const stack: Stack<number> = new Stack<number>();

stack.push(1);    // stack: [1]
stack.push(2);    // stack: [1,2]
stack.push(3);    // stack: [1,2,3]

console.log(stack.top());   // 3
console.log(stack.size());  // 3

stack.pop();              // stack: [1,2]
console.log(stack.top()); // 2
```


# Matrix
A matrix implementation in TypeScript that provides operations for matrix manipulation, such as addition, multiplication, and transposition.

## Constructor
`constructor(rows: number, cols: number)` - Creates a new matrix with the specified number of rows and columns, initialized with undefined.

## Methods
`get(row: number, col: number): T | undefined` - Returns the element at the specified row and column, or undefined if out of bounds.  
`set(row: number, col: number, value: T): void` - Sets the element at the specified row and column to the given value. Ignores if out of bounds.  
`add(matrix: Matrix<T>): Matrix<T>` - Adds another matrix to this matrix and returns the result. Matrices must have same dimensions.  
`multiply(matrix: Matrix<T>): Matrix<T>` - Multiplies this matrix by another matrix and returns the result. Number of columns in first matrix must equal rows in second.  
`transpose(): Matrix<T>` - Returns a new matrix that is the transpose of this matrix (rows become columns and vice versa).  
`fill(value: T): void` - Fills the entire matrix with the given value.  
`clone(): Matrix<T>` - Returns a deep copy of the matrix with all values copied.  
`toArray(): T[][]` - Returns a copy of the internal 2D array representation.  
`getRow(row: number): T[]` - Returns a copy of the specified row as an array. Returns empty array if invalid row.  
`getColumn(col: number): T[]` - Returns a copy of the specified column as an array. Returns empty array if invalid column.  
`setRow(row: number, values: T[]): void` - Sets the specified row to the given array. Values array length must match columns.  
`setColumn(col: number, values: T[]): void` - Sets the specified column to the given array. Values array length must match rows.  
`resize(rows: number, cols: number): void` - Resizes the matrix to new dimensions, preserving existing values where possible.  
`map(fn: (value: T, row: number, col: number) => T): Matrix<T>` - Returns a new matrix with the function applied to each element.  
`forEach(fn: (value: T, row: number, col: number) => void): void` - Executes the function for each element in the matrix.  
`swapRows(row1: number, row2: number): void` - Swaps the positions of two rows in the matrix.  
`swapColumns(col1: number, col2: number): void` - Swaps the positions of two columns in the matrix.  
`submatrix(startRow: number, startCol: number, endRow: number, endCol: number): Matrix<T>` - Extracts a submatrix from the given bounds.  
`insertMatrix(other: Matrix<T>, startRow: number, startCol: number): void` - Inserts another matrix into this matrix at the specified position.  
`getDiagonal(): T[]` - Returns the diagonal elements of the matrix as an array.  
`setDiagonal(values: T[]): void` - Sets the diagonal elements of the matrix from the given array.  
`trace(): T` - Calculates and returns the sum of diagonal elements.  
`isSquare(): boolean` - Checks if the matrix has equal number of rows and columns.  
`isSymmetric(): boolean` - Checks if the matrix is symmetric (equal to its transpose).  
`scalarMultiply(scalar: number): Matrix<T>` - Multiplies each element in the matrix by a scalar value.  
`subtract(other: Matrix<T>): Matrix<T>` - Subtracts another matrix from this matrix and returns the result.  
`equals(other: Matrix<T>): boolean` - Checks if this matrix is equal to another matrix.  
`isEmpty(): boolean` - Checks if the matrix is empty.  
`clear(): void` - Resets all elements in the matrix to undefined.  
`size(): number` - Returns the total number of elements in the matrix (rows * columns).  

### Example Usage
```typescript
import { Matrix } from 'typescript-ds-lib';

const matrix: Matrix<number> = new Matrix<number>(3, 3, 0);

matrix.set(0, 0, 1);
matrix.set(1, 1, 2);
matrix.set(2, 2, 3);

console.log(matrix.get(1, 1));  // 2
console.log(matrix.size());     // { rows: 3, cols: 3 }

const transposed = matrix.transpose();
console.log(transposed.get(0, 0));  // 1
```
