import { LinkedList } from '../lib/linked-list';

describe('LinkedList', () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  test('should add elements to the end', () => {
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    expect(list.size()).toBe(3);
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(2);
    expect(list.get(2)).toBe(3);
  });

  test('should add elements to the front', () => {
    list.pushFront(1);
    list.pushFront(2);
    list.pushFront(3);
    expect(list.size()).toBe(3);
    expect(list.get(0)).toBe(3);
    expect(list.get(1)).toBe(2);
    expect(list.get(2)).toBe(1);
  });

  test('should insert at valid positions', () => {
    list.pushBack(1);
    list.pushBack(3);
    expect(list.insert(2, 1)).toBe(true);
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(2);
    expect(list.get(2)).toBe(3);
  });

  test('should insert at beginning', () => {
    list.pushBack(1);
    list.pushBack(2);
    expect(list.insert(0, 0)).toBe(true);
    expect(list.get(0)).toBe(0);
    expect(list.get(1)).toBe(1);
    expect(list.get(2)).toBe(2);
  });

  test('should insert at end', () => {
    list.pushBack(1);
    list.pushBack(2);
    expect(list.insert(3, 2)).toBe(true);
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(2);
    expect(list.get(2)).toBe(3);
  });

  test('should return false for invalid positions', () => {
    expect(list.insert(1, -1)).toBe(false);
    expect(list.insert(1, 1)).toBe(false);
  });

  test('should remove elements that satisfy the condition', () => {
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    expect(list.removeIf(x => x === 2)).toBe(true);
    expect(list.size()).toBe(2);
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(3);
  });

  test('should remove multiple elements that satisfy the condition', () => {
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(2);
    list.pushBack(3);
    expect(list.removeIf(x => x === 2)).toBe(true);
    expect(list.size()).toBe(3);
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(2);
    expect(list.get(2)).toBe(3);
  });

  test('should remove first element that satisfies condition', () => {
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    expect(list.removeIf(x => x === 1)).toBe(true);
    expect(list.size()).toBe(2);
    expect(list.get(0)).toBe(2);
    expect(list.get(1)).toBe(3);
  });

  test('should remove last element that satisfies condition', () => {
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    expect(list.removeIf(x => x === 3)).toBe(true);
    expect(list.size()).toBe(2);
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(2);
  });

  test('should return false if no element satisfies the condition', () => {
    list.pushBack(1);
    list.pushBack(2);
    expect(list.removeIf(x => x === 3)).toBe(false);
    expect(list.size()).toBe(2);
  });

  test('should remove elements at valid positions', () => {
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    expect(list.removeAt(1)).toBe(2);
    expect(list.size()).toBe(2);
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(3);
  });

  test('should remove first element', () => {
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    expect(list.removeAt(0)).toBe(1);
    expect(list.size()).toBe(2);
    expect(list.get(0)).toBe(2);
    expect(list.get(1)).toBe(3);
  });

  test('should remove last element', () => {
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    expect(list.removeAt(2)).toBe(3);
    expect(list.size()).toBe(2);
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(2);
  });

  test('should return undefined for invalid positions', () => {
    list.pushBack(1);
    expect(list.removeAt(-1)).toBeUndefined();
    expect(list.removeAt(1)).toBeUndefined();
  });

  test('should return elements at valid positions', () => {
    list.pushBack(1);
    list.pushBack(2);
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(2);
  });

  test('should return undefined for invalid positions', () => {
    list.pushBack(1);
    expect(list.get(-1)).toBeUndefined();
    expect(list.get(1)).toBeUndefined();
  });

  test('should return true for empty list', () => {
    expect(list.isEmpty()).toBe(true);
  });

  test('should return false for non-empty list', () => {
    list.pushBack(1);
    expect(list.isEmpty()).toBe(false);
  });

  test('should return correct size', () => {
    expect(list.size()).toBe(0);
    list.pushBack(1);
    expect(list.size()).toBe(1);
    list.pushBack(2);
    expect(list.size()).toBe(2);
  });

  test('should remove all elements', () => {
    list.pushBack(1);
    list.pushBack(2);
    list.clear();
    expect(list.isEmpty()).toBe(true);
    expect(list.size()).toBe(0);
  });

  test('should pop elements from back', () => {
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    expect(list.popBack()).toBe(3);
    expect(list.size()).toBe(2);
    expect(list.popBack()).toBe(2);
    expect(list.size()).toBe(1);
    expect(list.popBack()).toBe(1);
    expect(list.size()).toBe(0);
  });

  test('should return undefined when popping from empty list from back', () => {
    expect(list.popBack()).toBeUndefined();
  });

  test('should pop elements from front', () => {
    list.pushBack(1);
    list.pushBack(2);
    list.pushBack(3);
    expect(list.popFront()).toBe(1);
    expect(list.size()).toBe(2);
    expect(list.popFront()).toBe(2);
    expect(list.size()).toBe(1);
    expect(list.popFront()).toBe(3);
    expect(list.size()).toBe(0);
  });

  test('should return undefined when popping from empty list from front', () => {
    expect(list.popFront()).toBeUndefined();
  });

  test('should handle mixed push and pop operations', () => {
    list.pushBack(1);
    list.pushFront(2);
    expect(list.popBack()).toBe(1);
    list.pushBack(3);
    expect(list.popFront()).toBe(2);
    expect(list.size()).toBe(1);
    expect(list.get(0)).toBe(3);
  });

  test('should maintain correct order after multiple operations', () => {
    list.pushBack(1);
    list.pushFront(2);
    list.pushBack(3);
    list.pushFront(4);
    expect(list.size()).toBe(4);
    expect(list.get(0)).toBe(4);
    expect(list.get(1)).toBe(2);
    expect(list.get(2)).toBe(1);
    expect(list.get(3)).toBe(3);
  });

  test('should insert before element that satisfies condition', () => {
    list.pushBack(1);
    list.pushBack(3);
    list.pushBack(5);
    expect(list.insertBefore(2, x => x === 3)).toBe(true);
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(2);
    expect(list.get(2)).toBe(3);
    expect(list.get(3)).toBe(5);
  });

  test('should insert before first element when condition matches', () => {
    list.pushBack(1);
    list.pushBack(2);
    expect(list.insertBefore(0, x => x === 1)).toBe(true);
    expect(list.get(0)).toBe(0);
    expect(list.get(1)).toBe(1);
    expect(list.get(2)).toBe(2);
  });

  test('should return false when inserting before with no match', () => {
    list.pushBack(1);
    list.pushBack(2);
    expect(list.insertBefore(3, x => x === 4)).toBe(false);
  });

  test('should insert after element that satisfies condition', () => {
    list.pushBack(1);
    list.pushBack(3);
    list.pushBack(5);
    expect(list.insertAfter(4, x => x === 3)).toBe(true);
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(3);
    expect(list.get(2)).toBe(4);
    expect(list.get(3)).toBe(5);
  });

  test('should insert after last element when condition matches', () => {
    list.pushBack(1);
    list.pushBack(2);
    expect(list.insertAfter(3, x => x === 2)).toBe(true);
    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(2);
    expect(list.get(2)).toBe(3);
  });

  test('should return false when inserting after with no match', () => {
    list.pushBack(1);
    list.pushBack(2);
    expect(list.insertAfter(3, x => x === 4)).toBe(false);
  });
});
