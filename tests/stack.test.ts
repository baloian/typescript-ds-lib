import { Stack } from '../lib/stack';

describe('Stack', () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack<number>();
  });

  test('should create empty stack', () => {
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
  });

  test('should push elements to stack', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
    expect(stack.top()).toBe(2);
  });

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

  test('should return top element without removing it', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.top()).toBe(2);
    expect(stack.size()).toBe(2);
  });

  test('should return undefined when checking top of empty stack', () => {
    expect(stack.top()).toBeUndefined();
  });

  test('should clear all elements from stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.clear();
    expect(stack.isEmpty()).toBe(true);
    expect(stack.size()).toBe(0);
  });

  test('should correctly report size', () => {
    expect(stack.size()).toBe(0);
    stack.push(1);
    expect(stack.size()).toBe(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
    stack.pop();
    expect(stack.size()).toBe(1);
  });
});
