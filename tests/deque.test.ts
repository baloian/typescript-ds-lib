import { Deque } from '../lib/deque';

describe('Deque', () => {
  let deque: Deque<number>;

  beforeEach(() => {
    deque = new Deque<number>();
  });

  test('should create empty deque', () => {
    expect(deque.isEmpty()).toBe(true);
    expect(deque.size()).toBe(0);
  });

  test('should push elements to front', () => {
    deque.pushFront(1);
    deque.pushFront(2);
    expect(deque.size()).toBe(2);
    expect(deque.front()).toBe(2);
    expect(deque.back()).toBe(1);
  });

  test('should push elements to back', () => {
    deque.pushBack(1);
    deque.pushBack(2);
    expect(deque.size()).toBe(2);
    expect(deque.front()).toBe(1);
    expect(deque.back()).toBe(2);
  });

  test('should pop elements from front', () => {
    deque.pushBack(1);
    deque.pushBack(2);
    expect(deque.popFront()).toBe(1);
    expect(deque.size()).toBe(1);
    expect(deque.popFront()).toBe(2);
    expect(deque.isEmpty()).toBe(true);
  });

  test('should pop elements from back', () => {
    deque.pushBack(1);
    deque.pushBack(2);
    expect(deque.popBack()).toBe(2);
    expect(deque.size()).toBe(1);
    expect(deque.popBack()).toBe(1);
    expect(deque.isEmpty()).toBe(true);
  });

  test('should return undefined when popping empty deque', () => {
    expect(deque.popFront()).toBeUndefined();
    expect(deque.popBack()).toBeUndefined();
  });

  test('should return front and back elements without removing them', () => {
    deque.pushBack(1);
    deque.pushBack(2);
    expect(deque.front()).toBe(1);
    expect(deque.back()).toBe(2);
    expect(deque.size()).toBe(2);
  });

  test('should return undefined when checking front/back of empty deque', () => {
    expect(deque.front()).toBeUndefined();
    expect(deque.back()).toBeUndefined();
  });

  test('should clear all elements from deque', () => {
    deque.pushBack(1);
    deque.pushBack(2);
    deque.pushBack(3);
    deque.clear();
    expect(deque.isEmpty()).toBe(true);
    expect(deque.size()).toBe(0);
  });

  test('should correctly report size', () => {
    expect(deque.size()).toBe(0);
    deque.pushBack(1);
    expect(deque.size()).toBe(1);
    deque.pushFront(2);
    expect(deque.size()).toBe(2);
    deque.popBack();
    expect(deque.size()).toBe(1);
    deque.popFront();
    expect(deque.size()).toBe(0);
  });
});
