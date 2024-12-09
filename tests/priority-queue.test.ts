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
});
