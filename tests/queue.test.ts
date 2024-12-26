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

  describe('equality', () => {
    test('should consider empty queues equal', () => {
      const queue1 = new Queue<number>();
      const queue2 = new Queue<number>();
      expect(queue1.equals(queue2)).toBe(true);
    });

    test('should consider queues with same elements in same order equal', () => {
      const queue1 = new Queue<number>();
      const queue2 = new Queue<number>();

      queue1.push(1);
      queue1.push(2);
      queue1.push(3);

      queue2.push(1);
      queue2.push(2);
      queue2.push(3);

      expect(queue1.equals(queue2)).toBe(true);
    });

    test('should consider queues with different elements unequal', () => {
      const queue1 = new Queue<number>();
      const queue2 = new Queue<number>();

      queue1.push(1);
      queue1.push(2);
      queue1.push(3);

      queue2.push(1);
      queue2.push(2);
      queue2.push(4);

      expect(queue1.equals(queue2)).toBe(false);
    });

    test('should consider queues with different sizes unequal', () => {
      const queue1 = new Queue<number>();
      const queue2 = new Queue<number>();

      queue1.push(1);
      queue1.push(2);
      queue2.push(1);

      expect(queue1.equals(queue2)).toBe(false);
    });

    test('should handle comparison with null/undefined', () => {
      const queue1 = new Queue<number>();
      queue1.push(1);

      expect(queue1.equals(null as any)).toBe(false);
      expect(queue1.equals(undefined as any)).toBe(false);
    });
  });
});
