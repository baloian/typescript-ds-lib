import { PriorityQueue } from '../lib/priority-queue';

describe('PriorityQueue', () => {
  let pq: PriorityQueue<string>;
  let numPq: PriorityQueue<number>;

  beforeEach(() => {
    pq = new PriorityQueue<string>((a: string, b: string) => a < b);
    numPq = new PriorityQueue<number>((a: number, b: number) => a < b);
  });

  describe('initialization', () => {
    test('should create empty priority queue', () => {
      expect(pq.isEmpty()).toBe(true);
      expect(pq.size()).toBe(0);
      expect(numPq.isEmpty()).toBe(true);
      expect(numPq.size()).toBe(0);
    });
  });

  describe('push operations', () => {
    test('should push string elements', () => {
      pq.push('first');
      pq.push('second');
      pq.push('third');
      expect(pq.size()).toBe(3);
      expect(pq.front()).toBe('first');
    });

    test('should push number elements', () => {
      numPq.push(3);
      numPq.push(1);
      numPq.push(2);
      expect(numPq.size()).toBe(3);
      expect(numPq.front()).toBe(1);
    });

    test('should maintain order when pushing strings', () => {
      pq.push('c');
      pq.push('a');
      pq.push('b');
      expect(pq.pop()).toBe('a');
      expect(pq.pop()).toBe('b');
      expect(pq.pop()).toBe('c');
    });

    test('should maintain order when pushing numbers', () => {
      numPq.push(30);
      numPq.push(10);
      numPq.push(20);
      expect(numPq.pop()).toBe(10);
      expect(numPq.pop()).toBe(20);
      expect(numPq.pop()).toBe(30);
    });
  });

  describe('pop operations', () => {
    test('should pop string elements in order', () => {
      pq.push('c');
      pq.push('a');
      pq.push('b');
      expect(pq.pop()).toBe('a');
      expect(pq.size()).toBe(2);
      expect(pq.pop()).toBe('b');
      expect(pq.pop()).toBe('c');
      expect(pq.isEmpty()).toBe(true);
    });

    test('should pop number elements in order', () => {
      numPq.push(300);
      numPq.push(100);
      numPq.push(200);
      expect(numPq.pop()).toBe(100);
      expect(numPq.size()).toBe(2);
      expect(numPq.pop()).toBe(200);
      expect(numPq.pop()).toBe(300);
      expect(numPq.isEmpty()).toBe(true);
    });

    test('should return undefined when popping empty queues', () => {
      expect(pq.pop()).toBeUndefined();
      expect(numPq.pop()).toBeUndefined();
    });
  });

  describe('front operations', () => {
    test('should return front string element without removing it', () => {
      pq.push('b');
      pq.push('a');
      expect(pq.front()).toBe('a');
      expect(pq.size()).toBe(2);
    });

    test('should return front number element without removing it', () => {
      numPq.push(20);
      numPq.push(10);
      expect(numPq.front()).toBe(10);
      expect(numPq.size()).toBe(2);
    });

    test('should return undefined when checking front of empty queues', () => {
      expect(pq.front()).toBeUndefined();
      expect(numPq.front()).toBeUndefined();
    });
  });

  describe('clear operations', () => {
    test('should clear all string elements from queue', () => {
      pq.push('a');
      pq.push('b');
      pq.push('c');
      pq.clear();
      expect(pq.isEmpty()).toBe(true);
      expect(pq.size()).toBe(0);
    });

    test('should clear all number elements from queue', () => {
      numPq.push(1);
      numPq.push(2);
      numPq.push(3);
      numPq.clear();
      expect(numPq.isEmpty()).toBe(true);
      expect(numPq.size()).toBe(0);
    });

    test('should handle pushing strings after clearing', () => {
      pq.push('x');
      pq.push('y');
      pq.clear();
      pq.push('z');
      expect(pq.size()).toBe(1);
      expect(pq.front()).toBe('z');
    });

    test('should handle pushing numbers after clearing', () => {
      numPq.push(1);
      numPq.push(2);
      numPq.clear();
      numPq.push(3);
      expect(numPq.size()).toBe(1);
      expect(numPq.front()).toBe(3);
    });
  });

  describe('ordering behavior', () => {
    test('should handle string elements in order', () => {
      pq.push('a');
      pq.push('b');
      pq.push('c');
      expect(pq.pop()).toBe('a');
      expect(pq.pop()).toBe('b');
      expect(pq.pop()).toBe('c');
    });

    test('should handle number elements in order', () => {
      numPq.push(10);
      numPq.push(20);
      numPq.push(30);
      expect(numPq.pop()).toBe(10);
      expect(numPq.pop()).toBe(20);
      expect(numPq.pop()).toBe(30);
    });

    test('should handle mixed string insertions', () => {
      pq.push('c');
      pq.push('a');
      pq.push('b');
      pq.push('d');
      pq.push('e');
      expect(pq.pop()).toBe('a');
      expect(pq.pop()).toBe('b');
      expect(pq.pop()).toBe('c');
      expect(pq.pop()).toBe('d');
      expect(pq.pop()).toBe('e');
    });

    test('should handle mixed number insertions', () => {
      numPq.push(30);
      numPq.push(10);
      numPq.push(20);
      numPq.push(40);
      numPq.push(50);
      expect(numPq.pop()).toBe(10);
      expect(numPq.pop()).toBe(20);
      expect(numPq.pop()).toBe(30);
      expect(numPq.pop()).toBe(40);
      expect(numPq.pop()).toBe(50);
    });
  });

  describe('size management', () => {
    test('should maintain size correctly after string operations', () => {
      expect(pq.size()).toBe(0);
      pq.push('x');
      expect(pq.size()).toBe(1);
      pq.push('y');
      expect(pq.size()).toBe(2);
      pq.pop();
      expect(pq.size()).toBe(1);
      pq.clear();
      expect(pq.size()).toBe(0);
    });

    test('should maintain size correctly after number operations', () => {
      expect(numPq.size()).toBe(0);
      numPq.push(1);
      expect(numPq.size()).toBe(1);
      numPq.push(2);
      expect(numPq.size()).toBe(2);
      numPq.pop();
      expect(numPq.size()).toBe(1);
      numPq.clear();
      expect(numPq.size()).toBe(0);
    });
  });

  describe('performance', () => {
    test('should handle large number of string elements', () => {
      for (let i = 0; i < 1000; i++) {
        pq.push(`item${i.toString().padStart(4, '0')}`);
      }
      let count = 0;
      while (!pq.isEmpty()) {
        count++;
        pq.pop();
      }
      expect(count).toBe(1000);
    });

    test('should handle large number of number elements', () => {
      for (let i = 0; i < 1000; i++) {
        numPq.push(i);
      }
      let count = 0;
      while (!numPq.isEmpty()) {
        count++;
        numPq.pop();
      }
      expect(count).toBe(1000);
    });
  });

  describe('equality', () => {
    test('should consider empty queues equal', () => {
      const pq1 = new PriorityQueue<string>((a, b) => a < b);
      const pq2 = new PriorityQueue<string>((a, b) => a < b);
      expect(pq1.equals(pq2)).toBe(true);
    });

    test('should consider queues with same elements in same order equal', () => {
      const pq1 = new PriorityQueue<string>((a, b) => a < b);
      const pq2 = new PriorityQueue<string>((a, b) => a < b);

      pq1.push('a');
      pq1.push('b');
      pq1.push('c');

      pq2.push('a');
      pq2.push('b');
      pq2.push('c');

      expect(pq1.equals(pq2)).toBe(true);
    });

    test('should consider queues with different elements unequal', () => {
      const pq1 = new PriorityQueue<string>((a, b) => a < b);
      const pq2 = new PriorityQueue<string>((a, b) => a < b);

      pq1.push('a');
      pq1.push('b');
      pq1.push('c');

      pq2.push('a');
      pq2.push('b');
      pq2.push('d');

      expect(pq1.equals(pq2)).toBe(false);
    });

    test('should consider queues with different sizes unequal', () => {
      const pq1 = new PriorityQueue<string>((a, b) => a < b);
      const pq2 = new PriorityQueue<string>((a, b) => a < b);

      pq1.push('a');
      pq1.push('b');

      pq2.push('a');
      pq2.push('b');
      pq2.push('c');

      expect(pq1.equals(pq2)).toBe(false);
    });

    test('should handle comparison with null/undefined', () => {
      const pq1 = new PriorityQueue<string>((a, b) => a < b);
      pq1.push('a');

      expect(pq1.equals(null as any)).toBe(false);
      expect(pq1.equals(undefined as any)).toBe(false);
    });

    test('should consider queues with different comparators unequal', () => {
      const pq1 = new PriorityQueue<string>((a, b) => a < b);
      const pq2 = new PriorityQueue<string>((a, b) => a > b);

      pq1.push('a');
      pq1.push('b');

      pq2.push('a');
      pq2.push('b');

      expect(pq1.equals(pq2)).toBe(false);
    });
  });
});
