# TypeScript Data Structure Library
[![NPM](https://img.shields.io/npm/v/marcal.svg?label=npm%20package&color=limegreen)](https://www.npmjs.com/package/typescript-ds-lib)

Native TypeScript data structure implementations without external dependencies.

1. Fast
2. Native & Light
3. Fully Tested

## Install
```
npm install typescript-ds-lib
```

## Usage
```typescript
import { Stack, StackTy } from 'typescript-ds-lib';

const stack: StackTy<number> = new Stack<number>();

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.top());   // 3
console.log(stack.pop());   // 3
console.log(stack.size());  // 2
```

## Data Structures
- Stack
- Queue
- Priority Queue
- Linked List
- Binary Search Tree
- Red-Black Tree
- Deque
- Set
- Map


## Contributions
Contributions are welcome and can be made by submitting GitHub pull requests
to this repository. In general, the source code follows
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and the
rules specified in `.eslintrc.json` file.


## License
This source code is available to everyone under the standard
[MIT LICENSE](https://github.com/baloian/marcal/blob/master/LICENSE).
