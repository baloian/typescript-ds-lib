import { Stack } from '../lib/stack';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  describe('initialization', () => {
    test('should create empty stack', () => {
      expect(stack.isEmpty()).toBe(true);
      expect(stack.size()).toBe(0);
      expect(stack.top()).toBeUndefined();
    });
  });

  describe('push operations', () => {
    test('should push elements to stack', () => {
      stack.push(1);
      stack.push(2);
      expect(stack.size()).toBe(2);
      expect(stack.top()).toBe(2);
    });

    test('should push multiple elements in correct order', () => {
      const elements = [1, 2, 3, 4, 5];
      elements.forEach(elem => stack.push(elem));

      for (let i = elements.length - 1; i >= 0; i--) {
        expect(stack.pop()).toBe(elements[i]);
      }
    });

    test('should handle pushing after clearing', () => {
      stack.push(1);
      stack.clear();
      stack.push(2);
      expect(stack.top()).toBe(2);
      expect(stack.size()).toBe(1);
    });
  });

  describe('pop operations', () => {
    test('should pop elements from stack', () => {
      stack.push(1);
      stack.push(2);
      expect(stack.pop()).toBe(2);
      expect(stack.size()).toBe(1);
      expect(stack.pop()).toBe(1);
      expect(stack.isEmpty()).toBe(true);
    });

    test('should return undefined when popping empty stack', () => {
      expect(stack.pop()).toBeUndefined();
    });

    test('should handle multiple pop operations on empty stack', () => {
      expect(stack.pop()).toBeUndefined();
      expect(stack.pop()).toBeUndefined();
      expect(stack.isEmpty()).toBe(true);
    });

    test('should handle push after pop operations', () => {
      stack.push(1);
      stack.pop();
      stack.push(2);
      expect(stack.top()).toBe(2);
      expect(stack.size()).toBe(1);
    });
  });

  describe('top operations', () => {
    test('should return top element without removing it', () => {
      stack.push(1);
      stack.push(2);
      expect(stack.top()).toBe(2);
      expect(stack.size()).toBe(2);
    });

    test('should return undefined when checking top of empty stack', () => {
      expect(stack.top()).toBeUndefined();
    });

    test('should consistently return same top element', () => {
      stack.push(42);
      expect(stack.top()).toBe(42);
      expect(stack.top()).toBe(42);
      expect(stack.size()).toBe(1);
    });
  });

  describe('clear operations', () => {
    test('should clear all elements from stack', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);
      stack.clear();
      expect(stack.isEmpty()).toBe(true);
      expect(stack.size()).toBe(0);
    });

    test('should handle clear on empty stack', () => {
      stack.clear();
      expect(stack.isEmpty()).toBe(true);
      expect(stack.size()).toBe(0);
    });

    test('should handle multiple clear operations', () => {
      stack.push(1);
      stack.clear();
      stack.clear();
      expect(stack.isEmpty()).toBe(true);
      expect(stack.size()).toBe(0);
    });
  });

  describe('size operations', () => {
    test('should correctly report size', () => {
      expect(stack.size()).toBe(0);
      stack.push(1);
      expect(stack.size()).toBe(1);
      stack.push(2);
      expect(stack.size()).toBe(2);
      stack.pop();
      expect(stack.size()).toBe(1);
    });

    test('should handle size after various operations', () => {
      stack.push(1);
      stack.push(2);
      stack.pop();
      stack.push(3);
      stack.push(4);
      stack.pop();
      expect(stack.size()).toBe(2);
    });
  });

  describe('edge cases', () => {
    test('should handle alternating push/pop operations', () => {
      stack.push(1);
      expect(stack.pop()).toBe(1);
      stack.push(2);
      expect(stack.pop()).toBe(2);
      expect(stack.isEmpty()).toBe(true);
    });

    test('should handle large number of operations', () => {
      const iterations = 1000;
      for (let i = 0; i < iterations; i++) {
        stack.push(i);
      }
      expect(stack.size()).toBe(iterations);
      for (let i = iterations - 1; i >= 0; i--) {
        expect(stack.pop()).toBe(i);
      }
      expect(stack.isEmpty()).toBe(true);
    });
  });
});
