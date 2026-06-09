import { LRUCache } from '../data-structures/lru-cache';

describe('LRUCache', () => {
  test('should reject non-positive capacity', () => {
    expect(() => new LRUCache<string, number>(0)).toThrow(
      'LRU cache capacity must be greater than 0'
    );
    expect(() => new LRUCache<string, number>(-1)).toThrow(
      'LRU cache capacity must be greater than 0'
    );
  });

  test('should insert and retrieve values', () => {
    const cache = new LRUCache<string, number>(2);
    cache.put('a', 1);
    cache.put('b', 2);

    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBe(2);
    expect(cache.size()).toBe(2);
    expect(cache.capacity()).toBe(2);
  });

  test('should update existing keys without increasing size', () => {
    const cache = new LRUCache<string, number>(2);
    cache.put('a', 1);
    cache.put('a', 10);

    expect(cache.get('a')).toBe(10);
    expect(cache.size()).toBe(1);
  });

  test('should evict least recently used entry', () => {
    const cache = new LRUCache<string, number>(2);
    cache.put('a', 1);
    cache.put('b', 2);
    cache.get('a');
    cache.put('c', 3);

    expect(cache.has('b')).toBe(false);
    expect(cache.get('a')).toBe(1);
    expect(cache.get('c')).toBe(3);
    expect(cache.size()).toBe(2);
  });

  test('should mark accessed entries as recently used', () => {
    const cache = new LRUCache<string, number>(2);
    cache.put('a', 1);
    cache.put('b', 2);
    cache.get('a');
    cache.put('c', 3);

    expect(cache.has('a')).toBe(true);
    expect(cache.has('b')).toBe(false);
  });

  test('should support peek without changing recency', () => {
    const cache = new LRUCache<string, number>(2);
    cache.put('a', 1);
    cache.put('b', 2);

    expect(cache.peek('a')).toBe(1);
    cache.put('c', 3);

    expect(cache.has('a')).toBe(false);
    expect(cache.has('b')).toBe(true);
  });

  test('should remove entries', () => {
    const cache = new LRUCache<string, number>(2);
    cache.put('a', 1);
    cache.put('b', 2);

    expect(cache.remove('a')).toBe(true);
    expect(cache.remove('missing')).toBe(false);
    expect(cache.size()).toBe(1);
    expect(cache.get('b')).toBe(2);
  });

  test('should clear all entries', () => {
    const cache = new LRUCache<string, number>(2);
    cache.put('a', 1);
    cache.put('b', 2);
    cache.clear();

    expect(cache.isEmpty()).toBe(true);
    expect(cache.get('a')).toBeUndefined();
  });

  test('should compare caches for equality', () => {
    const left = new LRUCache<string, number>(2);
    const right = new LRUCache<string, number>(2);
    left.put('a', 1);
    left.put('b', 2);
    right.put('a', 1);
    right.put('b', 2);

    expect(left.equals(right)).toBe(true);

    right.put('b', 20);
    expect(left.equals(right)).toBe(false);
  });
});
