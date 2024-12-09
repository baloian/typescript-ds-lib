import { Queue } from '../lib/queue';

describe('Queue', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  test('should create empty queue', () => {
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
  });

  test('should push elements to queue', () => {
    queue.push(1);
    queue.push(2);
    expect(queue.size()).toBe(2);
    expect(queue.front()).toBe(1);
  });

  test('should pop elements from queue', () => {
    queue.push(1);
    queue.push(2);
    expect(queue.pop()).toBe(1);
    expect(queue.size()).toBe(1);
    expect(queue.pop()).toBe(2);
    expect(queue.isEmpty()).toBe(true);
  });

  test('should return undefined when popping empty queue', () => {
    expect(queue.pop()).toBeUndefined();
  });

  test('should return front element without removing it', () => {
    queue.push(1);
    queue.push(2);
    expect(queue.front()).toBe(1);
    expect(queue.size()).toBe(2);
  });

  test('should return undefined when checking front of empty queue', () => {
    expect(queue.front()).toBeUndefined();
  });

  test('should clear all elements from queue', () => {
    queue.push(1);
    queue.push(2);
    queue.push(3);
    queue.clear();
    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);
  });
});
