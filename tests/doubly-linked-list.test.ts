import { DoublyLinkedList } from '../data-structures/doubly-linked-list';

describe('DoublyLinkedList', () => {
  let list: DoublyLinkedList<number>;

  beforeEach(() => {
    list = new DoublyLinkedList<number>();
  });

  test('should start empty', () => {
    expect(list.isEmpty()).toBe(true);
    expect(list.size()).toBe(0);
    expect(list.front()).toBeUndefined();
    expect(list.back()).toBeUndefined();
  });

  test('should push and pop from both ends', () => {
    list.pushBack(1);
    list.pushBack(2);
    list.pushFront(0);

    expect(list.size()).toBe(3);
    expect(list.front()).toBe(0);
    expect(list.back()).toBe(2);
    expect(list.popFront()).toBe(0);
    expect(list.popBack()).toBe(2);
    expect(list.popFront()).toBe(1);
    expect(list.isEmpty()).toBe(true);
  });

  test('should remove an arbitrary node', () => {
    const first = list.pushBack(1);
    const second = list.pushBack(2);
    const third = list.pushBack(3);

    list.removeNode(second);
    expect(list.size()).toBe(2);
    expect(list.front()).toBe(1);
    expect(list.back()).toBe(3);

    list.removeNode(first);
    expect(list.front()).toBe(3);

    list.removeNode(third);
    expect(list.isEmpty()).toBe(true);
  });

  test('should move a node to the front', () => {
    list.pushBack(1);
    const middle = list.pushBack(2);
    list.pushBack(3);

    list.moveToFront(middle);
    expect(list.front()).toBe(2);
    expect(list.back()).toBe(3);
    expect(list.size()).toBe(3);
  });

  test('should clear the list', () => {
    list.pushBack(1);
    list.pushBack(2);
    list.clear();
    expect(list.isEmpty()).toBe(true);
  });

  test('should compare lists for equality', () => {
    const other = new DoublyLinkedList<number>();
    list.pushBack(1);
    list.pushBack(2);
    other.pushBack(1);
    other.pushBack(2);
    expect(list.equals(other)).toBe(true);

    other.popBack();
    expect(list.equals(other)).toBe(false);
  });
});
