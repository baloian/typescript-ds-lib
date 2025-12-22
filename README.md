# TypeScript Data Structure Library
[![NPM](https://img.shields.io/npm/v/typescript-ds-lib?label=npm%20package&color=limegreen)](https://www.npmjs.com/package/typescript-ds-lib)

TypeScript data structure implementations without external dependencies.

**Why to use this library?**  
- Fully Tested
- Fast
- 0 Dependencies
- Lightweight
- Comes with Comparator (for custom types)
- `equals()` method provided for all data structures
- Well documented


## Install
```
npm install typescript-ds-lib
```


## Usage
```typescript
import { Stack } from 'typescript-ds-lib';

const stack: Stack<number> = new Stack<number>();

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.top());   // 3
stack.pop();
console.log(stack.top());   // 2
console.log(stack.size());  // 2
```


## Documentation and Examples
See the [documentation](https://github.com/baloian/typescript-ds-lib/blob/master/doc/README.md) for more details and examples.


## Data Structures
- Binary Search Tree
- Deque
- Graph (beta version and partially tested)
- Hash Table (unordered map)
- Heap
- Linked List
- Map
- Matrix
- Priority Queue
- Queue
- Red-Black Tree
- Set
- Stack


## `Map-Set` vs Native JavaScript `Map-Set`
The library's `Map` and `Set` data structures are implemented as Red-Black Tree and Binary Search Tree respectively.
Native JavaScript `Map` and `Set` are implemented as Hash Table and Hash Set respectively.

When to use the library's `Map` and `Set`?  
- If CPU consumption is important for you as RBT and BST do not do any kind of CPU intensive hashing.
- If your goal is to have a balanced tree with O(log n) complexity for all the operations in Map.
- If memory efficiency is important for you as RBT and BST are more memory efficient than Hash Table and HashSet.

You can consider the library's `Map` and `Set` as ordered map and set, and native JavaScript `Map` and `Set` as unordered map and set.


## Contributions
Contributions are welcome and can be made by submitting GitHub pull requests
to this repository.


## License
This source code is available to everyone under the standard
[MIT LICENSE](https://github.com/baloian/marcal/blob/master/LICENSE).
