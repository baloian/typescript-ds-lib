import { Heap } from '../lib/heap';

describe('Heap', () => {
  let heap: Heap<number>;

  beforeEach(() => {
    heap = new Heap<number>();
  });

  describe('initialization', () => {
    test('should create empty heap', () => {
      expect(heap.isEmpty()).toBe(true);
      expect(heap.size()).toBe(0);
    });

    test('should initialize with custom comparator', () => {
      const maxHeap = new Heap<number>((a, b) => a > b);
      expect(maxHeap.isEmpty()).toBe(true);
      expect(maxHeap.size()).toBe(0);
    });
  });

  describe('insertion', () => {
    test('should push elements and maintain min heap property', () => {
      heap.push(5);
      heap.push(3);
      heap.push(7);
      heap.push(1);

      expect(heap.peek()).toBe(1);
      expect(heap.size()).toBe(4);
    });

    test('should handle duplicate values', () => {
      heap.push(3);
      heap.push(3);
      heap.push(3);

      expect(heap.size()).toBe(3);
      expect(heap.pop()).toBe(3);
      expect(heap.pop()).toBe(3);
      expect(heap.pop()).toBe(3);
    });

    test('should handle negative numbers', () => {
      heap.push(-5);
      heap.push(3);
      heap.push(-10);
      heap.push(0);

      expect(heap.pop()).toBe(-10);
      expect(heap.pop()).toBe(-5);
      expect(heap.pop()).toBe(0);
      expect(heap.pop()).toBe(3);
    });
  });

  describe('removal', () => {
    test('should pop elements in sorted order', () => {
      heap.push(5);
      heap.push(3);
      heap.push(7);
      heap.push(1);

      expect(heap.pop()).toBe(1);
      expect(heap.pop()).toBe(3);
      expect(heap.pop()).toBe(5);
      expect(heap.pop()).toBe(7);
      expect(heap.pop()).toBeUndefined();
    });

    test('should clear all elements', () => {
      heap.push(1);
      heap.push(2);
      heap.push(3);

      heap.clear();
      expect(heap.isEmpty()).toBe(true);
      expect(heap.size()).toBe(0);
      expect(heap.peek()).toBeUndefined();
    });

    test('should handle pop on single element heap', () => {
      heap.push(1);
      expect(heap.pop()).toBe(1);
      expect(heap.isEmpty()).toBe(true);
    });

    test('should maintain heap property after multiple pops', () => {
      heap.push(5);
      heap.push(3);
      heap.push(7);
      heap.push(1);
      heap.push(4);

      heap.pop(); // removes 1
      heap.pop(); // removes 3
      heap.push(2); // adds new element

      expect(heap.pop()).toBe(2);
      expect(heap.pop()).toBe(4);
      expect(heap.pop()).toBe(5);
      expect(heap.pop()).toBe(7);
    });
  });

  describe('inspection', () => {
    test('should peek at top element without removing it', () => {
      heap.push(5);
      heap.push(3);

      expect(heap.peek()).toBe(3);
      expect(heap.size()).toBe(2);
    });

    test('should return undefined when peeking empty heap', () => {
      expect(heap.peek()).toBeUndefined();
    });

    test('should correctly report size after operations', () => {
      expect(heap.size()).toBe(0);
      
      heap.push(1);
      expect(heap.size()).toBe(1);
      
      heap.push(2);
      expect(heap.size()).toBe(2);
      
      heap.pop();
      expect(heap.size()).toBe(1);
      
      heap.clear();
      expect(heap.size()).toBe(0);
    });
  });

  describe('custom comparator', () => {
    test('should work as max heap with custom comparator', () => {
      const maxHeap = new Heap<number>((a, b) => a > b);
      
      maxHeap.push(5);
      maxHeap.push(3);
      maxHeap.push(7);
      maxHeap.push(1);

      expect(maxHeap.pop()).toBe(7);
      expect(maxHeap.pop()).toBe(5);
      expect(maxHeap.pop()).toBe(3);
      expect(maxHeap.pop()).toBe(1);
    });

    test('should work with custom object comparator', () => {
      interface Person {
        name: string;
        age: number;
      }
      
      const personHeap = new Heap<Person>((a, b) => a.age < b.age);
      
      personHeap.push({ name: 'Alice', age: 30 });
      personHeap.push({ name: 'Bob', age: 25 });
      personHeap.push({ name: 'Charlie', age: 35 });
      
      expect(personHeap.pop()?.age).toBe(25);
      expect(personHeap.pop()?.age).toBe(30);
      expect(personHeap.pop()?.age).toBe(35);
    });

    test('should handle equal elements with custom comparator', () => {
      const maxHeap = new Heap<number>((a, b) => a > b);
      
      maxHeap.push(5);
      maxHeap.push(5);
      maxHeap.push(5);
      
      expect(maxHeap.size()).toBe(3);
      expect(maxHeap.pop()).toBe(5);
      expect(maxHeap.pop()).toBe(5);
      expect(maxHeap.pop()).toBe(5);
    });
  });
});
