import { PriorityQueue } from '../lib/priority-queue';

describe('PriorityQueue', () => {
  let pq: PriorityQueue<string>;

  beforeEach(() => {
    pq = new PriorityQueue<string>();
  });

  test('should create empty priority queue', () => {
    expect(pq.isEmpty()).toBe(true);
    expect(pq.size()).toBe(0);
  });

  test('should push elements with priority', () => {
    pq.push('low', 1);
    pq.push('high', 3); 
    pq.push('medium', 2);
    expect(pq.size()).toBe(3);
    expect(pq.front()).toBe('high');
  });

  test('should maintain priority order when pushing', () => {
    pq.push('third', 1);
    pq.push('first', 3);
    pq.push('second', 2);
    expect(pq.pop()).toBe('first');
    expect(pq.pop()).toBe('second');
    expect(pq.pop()).toBe('third');
  });

  test('should pop elements in priority order', () => {
    pq.push('low', 1);
    pq.push('high', 3);
    pq.push('medium', 2);
    expect(pq.pop()).toBe('high');
    expect(pq.size()).toBe(2);
    expect(pq.pop()).toBe('medium');
    expect(pq.pop()).toBe('low');
    expect(pq.isEmpty()).toBe(true);
  });

  test('should return undefined when popping empty queue', () => {
    expect(pq.pop()).toBeUndefined();
  });

  test('should return front element without removing it', () => {
    pq.push('low', 1);
    pq.push('high', 3);
    expect(pq.front()).toBe('high');
    expect(pq.size()).toBe(2);
  });

  test('should return undefined when checking front of empty queue', () => {
    expect(pq.front()).toBeUndefined();
  });

  test('should clear all elements from queue', () => {
    pq.push('low', 1);
    pq.push('high', 3);
    pq.push('medium', 2);
    pq.clear();
    expect(pq.isEmpty()).toBe(true);
    expect(pq.size()).toBe(0);
  });

  test('should handle elements with same priority in FIFO order', () => {
    pq.push('first', 1);
    pq.push('second', 1);
    pq.push('third', 1);
    expect(pq.pop()).toBe('first');
    expect(pq.pop()).toBe('second');
    expect(pq.pop()).toBe('third');
  });

  test('should handle negative priorities', () => {
    pq.push('lowest', -2);
    pq.push('middle', 0);
    pq.push('highest', 2);
    expect(pq.pop()).toBe('highest');
    expect(pq.pop()).toBe('middle');
    expect(pq.pop()).toBe('lowest');
  });

  test('should handle mixed priority insertions', () => {
    pq.push('medium1', 2);
    pq.push('low1', 1);
    pq.push('high', 3);
    pq.push('medium2', 2);
    pq.push('low2', 1);
    expect(pq.pop()).toBe('high');
    expect(pq.pop()).toBe('medium1');
    expect(pq.pop()).toBe('medium2');
    expect(pq.pop()).toBe('low1');
    expect(pq.pop()).toBe('low2');
  });

  test('should maintain size correctly after operations', () => {
    expect(pq.size()).toBe(0);
    pq.push('a', 1);
    expect(pq.size()).toBe(1);
    pq.push('b', 2);
    expect(pq.size()).toBe(2);
    pq.pop();
    expect(pq.size()).toBe(1);
    pq.clear();
    expect(pq.size()).toBe(0);
  });

  test('should handle pushing after clearing', () => {
    pq.push('a', 1);
    pq.push('b', 2);
    pq.clear();
    pq.push('c', 3);
    expect(pq.size()).toBe(1);
    expect(pq.front()).toBe('c');
  });

  test('should handle large number of elements', () => {
    for (let i = 0; i < 1000; i++) {
      pq.push(`item${i}`, Math.floor(Math.random() * 100));
    }
    let lastPriority = Infinity;
    let count = 0;
    while (!pq.isEmpty()) {
      count++;
      pq.pop();
    }
    expect(count).toBe(1000);
  });
});
