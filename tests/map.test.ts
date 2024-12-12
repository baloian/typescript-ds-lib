import { Map } from '../lib/map';

describe('Map', () => {
  let map: Map<string, number>;

  beforeEach(() => {
    map = new Map<string, number>();
  });

  describe('initialization', () => {
    test('should start empty', () => {
      expect(map.isEmpty()).toBe(true);
      expect(map.size()).toBe(0);
    });

    test('should initialize with custom comparator', () => {
      const reverseMap = new Map<string, number>((a, b) => a > b);
      reverseMap.insert('a', 1);
      reverseMap.insert('b', 2);
      reverseMap.insert('c', 3);

      const keys: string[] = [];
      reverseMap.forEach((key) => keys.push(key));
      expect(keys).toEqual(['c', 'b', 'a']);
    });
  });

  describe('insertion and lookup', () => {
    test('should insert and find key-value pairs correctly', () => {
      map.insert('one', 1);
      map.insert('two', 2);
      map.insert('three', 3);

      expect(map.isEmpty()).toBe(false);
      expect(map.size()).toBe(3);
      expect(map.find('one')).toBe(1);
      expect(map.find('two')).toBe(2);
      expect(map.find('three')).toBe(3);
      expect(map.find('four')).toBeUndefined();
    });

    test('should handle duplicate keys by updating values', () => {
      map.insert('test', 1);
      map.insert('test', 2);
      map.insert('test', 3);

      expect(map.size()).toBe(1);
      expect(map.find('test')).toBe(3);
    });

    test('should handle inserting undefined or null values', () => {
      map.insert('undefined', undefined as any);
      map.insert('null', null as any);

      expect(map.find('undefined')).toBeUndefined();
      expect(map.find('null')).toBeNull();
      expect(map.size()).toBe(2);
    });

    test('should handle large number of insertions', () => {
      const numInsertions = 1000;
      for (let i = 0; i < numInsertions; i++) {
        map.insert(`key${i}`, i);
      }
      expect(map.size()).toBe(numInsertions);
      expect(map.find('key500')).toBe(500);
    });
  });

  describe('deletion', () => {
    test('should delete key-value pairs correctly', () => {
      map.insert('one', 1);
      map.insert('two', 2);
      map.insert('three', 3);

      expect(map.size()).toBe(3);

      map.delete('two');
      expect(map.find('two')).toBeUndefined();
      expect(map.size()).toBe(2);

      map.delete('one');
      expect(map.find('one')).toBeUndefined();
      expect(map.size()).toBe(1);
    });

    test('should handle deleting non-existent keys', () => {
      map.insert('one', 1);
      map.insert('two', 2);

      const initialSize = map.size();
      map.delete('three');

      expect(map.size()).toBe(initialSize);
    });

    test('should clear all entries', () => {
      map.insert('one', 1);
      map.insert('two', 2);
      map.insert('three', 3);

      expect(map.isEmpty()).toBe(false);

      map.clear();

      expect(map.isEmpty()).toBe(true);
      expect(map.size()).toBe(0);
    });

    test('should handle repeated delete operations', () => {
      map.insert('test', 1);
      map.delete('test');
      map.delete('test');
      map.delete('test');

      expect(map.size()).toBe(0);
      expect(map.find('test')).toBeUndefined();
    });

    test('should handle delete after clear', () => {
      map.insert('one', 1);
      map.clear();
      map.delete('one');

      expect(map.size()).toBe(0);
      expect(map.find('one')).toBeUndefined();
    });
  });

  describe('iteration', () => {
    test('should iterate over all key-value pairs', () => {
      const entries: [string, number][] = [
        ['one', 1],
        ['two', 2],
        ['three', 3]
      ];

      entries.forEach(([key, value]) => map.insert(key, value));

      const result: [string, number][] = [];
      map.forEach((key, value) => {
        result.push([key, value]);
      });

      expect(result).toHaveLength(entries.length);
      entries.forEach(([key, value]) => {
        expect(result).toContainEqual([key, value]);
      });
    });

    test('should iterate in order based on keys', () => {
      map.insert('c', 3);
      map.insert('a', 1);
      map.insert('b', 2);

      const keys: string[] = [];
      map.forEach((key) => {
        keys.push(key);
      });

      expect(keys).toEqual(['a', 'b', 'c']);
    });

    test('should handle empty map', () => {
      const mockCallback = jest.fn();
      map.forEach(mockCallback);
      expect(mockCallback).not.toHaveBeenCalled();
    });

    test('should handle iteration after modifications', () => {
      map.insert('a', 1);
      map.insert('b', 2);
      map.insert('c', 3);

      map.delete('b');
      map.insert('d', 4);

      const result: string[] = [];
      map.forEach((key) => result.push(key));

      expect(result).toEqual(['a', 'c', 'd']);
    });

    test('should handle callback that modifies the map', () => {
      map.insert('a', 1);
      map.insert('b', 2);

      map.forEach((key, value) => {
        map.insert(key, value * 2);
      });

      expect(map.find('a')).toBe(2);
      expect(map.find('b')).toBe(4);
    });
  });

  describe('edge cases', () => {
    test('should handle special characters in keys', () => {
      const specialKeys = ['!@#$', '   ', '\n\t', ''];
      specialKeys.forEach((key, index) => {
        map.insert(key, index);
      });

      specialKeys.forEach((key, index) => {
        expect(map.find(key)).toBe(index);
      });
    });

    test('should handle operations after clear', () => {
      map.insert('a', 1);
      map.clear();
      map.insert('b', 2);

      expect(map.size()).toBe(1);
      expect(map.find('a')).toBeUndefined();
      expect(map.find('b')).toBe(2);
    });
  });
});
