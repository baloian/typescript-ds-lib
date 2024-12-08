# TypeScript Data Structure Library Documentation
This library provides a collection of commonly used data structures implemented in TypeScript. Each data structure is designed to be type-safe and efficient.
- [Binary Search Tree](https://github.com/baloian/typescript-ds-lib/blob/master/DOCUMENTATION.md#binary-search-tree)
- [Deque](https://github.com/baloian/typescript-ds-lib/blob/master/DOCUMENTATION.md#deque)


# Binary Search Tree
A binary search tree (BST) implementation in TypeScript that stores values in an ordered tree structure, with smaller values to the left and larger values to the right.

## Methods
`insert(value: T)` - Inserts a new value into the binary search tree.   
`find(value: T)` - Searches for a value in the binary search tree.  
`min()` - Returns the minimum value stored in the tree.  
`max()` - Returns the maximum value stored in the tree.  
`remove(value: T)` - Removes a value from the binary search tree if it exists.  
`empty()` - Checks if the binary search tree is empty.  
`clear()` - Removes all nodes from the binary search tree.  
`count()` - Returns the total number of nodes in the binary search tree.  

### Example Usage
```typescript
import { BinarySearchTree, BinarySearchTreeTy } from 'typescript-ds-lib';

const bst: BinarySearchTreeTy<number> = new BinarySearchTree<number>();

bst.insert(10);
bst.insert(5);
bst.insert(15);

console.log(bst.find(5));   // true
console.log(bst.min());     // 5
console.log(bst.max());     // 15
```


# Deque
A double-ended queue (Deque) implementation in TypeScript that allows insertion and deletion of elements from both ends of the queue.

## Methods
`pushFront(value: T)` - Adds an element to the front of the deque.  
`pushBack(value: T)` - Adds an element to the back of the deque.  
`popFront()` - Removes and returns the front element of the deque.  
`popBack()` - Removes and returns the back element of the deque.  
`front()` - Returns the front element without removing it.  
`back()` - Returns the back element without removing it.  
`empty()` - Checks if the deque is empty.  
`clear()` - Removes all elements from the deque.  
`size()` - Returns the total number of elements in the deque.  

### Example Usage
```typescript
import { Deque, DequeTy } from 'typescript-ds-lib';

const deque: DequeTy<number> = new Deque<number>();

deque.pushBack(1);    // deque: [1]
deque.pushFront(2);   // deque: [2,1]
deque.pushBack(3);    // deque: [2,1,3]

console.log(deque.front());  // 2
console.log(deque.back());   // 3
console.log(deque.size());   // 3

deque.popFront();     // deque: [1,3]
deque.popBack();      // deque: [1]
```
