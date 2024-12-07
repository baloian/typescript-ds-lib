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
    expect(list.empty()).toBe(true);
  });

  test('should return false for non-empty list', () => {
    list.pushBack(1);
    expect(list.empty()).toBe(false);
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
    expect(list.empty()).toBe(true);
    expect(list.size()).toBe(0);
  });
});
