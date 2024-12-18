# TypeScript Data Structure Library
[![NPM](https://img.shields.io/npm/v/typescript-ds-lib?label=npm%20package&color=limegreen)](https://www.npmjs.com/package/typescript-ds-lib)

TypeScript data structure implementations without external dependencies. Why to use this library?  

- Fully Tested
- Fast
- 0 Dependencies
- Lightweight
- Comes with Comparator (for custom types)
- `hashCode()` and `equals()` are supported


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
See the [documentation](https://github.com/baloian/typescript-ds-lib/blob/master/doc/DOCUMENTATION.md) for more details and examples.


## Data Structures
- Binary Search Tree
- Deque
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
- Graph (coming soon)

**Note:** The `Map` data structure is implemented as a Red-Black Tree and the `Set` data structure is implemented as a Binary Search Tree.

## Contributions
Contributions are welcome and can be made by submitting GitHub pull requests
to this repository. In general, the source code follows
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and the
rules specified in `.eslintrc.json` file.


## License
This source code is available to everyone under the standard
[MIT LICENSE](https://github.com/baloian/marcal/blob/master/LICENSE).
