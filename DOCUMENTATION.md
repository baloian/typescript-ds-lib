# Data Structures Library Documentation
This library provides a collection of commonly used data structures implemented in TypeScript. Each data structure is designed to be type-safe and efficient.


# Binary Search Tree Documentation
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
import { BinarySearchTree, BinarySearchTreeTy } from './lib/binary-search-tree';

const bst: BinarySearchTreeTy<number> = new BinarySearchTree<number>();

bst.insert(10);
bst.insert(5);
bst.insert(15);

console.log(bst.find(5));   // true
console.log(bst.min());     // 5
console.log(bst.max());     // 15
```










