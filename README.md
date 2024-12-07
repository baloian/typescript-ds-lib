# TypeScript Data Structure Library
Native TypeScript data structure implementations without external dependencies.

- Fast, Light and Tested

## Install
```
npm install typescript-ds-lib
```

## Usage
```typescript
import { Stack } from 'typescript-ds-lib';

const stack = new Stack<number>();

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.top());   // 3
console.log(stack.pop());   // 3
console.log(stack.size());  // 2
```

## Data Structures
- Slack
- Queue
- Priority Queue
- Binary Search Tree
- Deque


## Contributions
Contributions are welcome and can be made by submitting GitHub pull requests
to this repository. In general, the source code follows
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and the
rules specified in `.eslintrc.json` file.


## License
This source code is available to everyone under the standard
[MIT LICENSE](https://github.com/baloian/marcal/blob/master/LICENSE).
