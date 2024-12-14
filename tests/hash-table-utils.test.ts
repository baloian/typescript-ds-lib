import { HashTableUtils } from '../lib/hash-table-utils';

describe('HashTableUtils', () => {
  describe('hash', () => {
    test('should handle numbers', () => {
      expect(HashTableUtils.hash(42, 100)).toBeLessThan(100);
      expect(HashTableUtils.hash(-42, 100)).toBeLessThan(100);
      expect(HashTableUtils.hash(0, 100)).toBeLessThan(100);
      expect(HashTableUtils.hash(Number.MAX_SAFE_INTEGER, 100)).toBeLessThan(100);
      expect(HashTableUtils.hash(Number.MIN_SAFE_INTEGER, 100)).toBeLessThan(100);
    });

    test('should handle strings', () => {
      expect(HashTableUtils.hash('test', 100)).toBeLessThan(100);
      expect(HashTableUtils.hash('', 100)).toBeLessThan(100);
      expect(HashTableUtils.hash('long string with spaces', 100)).toBeLessThan(100);
      expect(HashTableUtils.hash('🚀', 100)).toBeLessThan(100); // Unicode characters
      expect(HashTableUtils.hash('\n\t\r', 100)).toBeLessThan(100); // Special characters
    });

    test('should handle objects with hashCode method', () => {
      const obj = {
        hashCode: () => 42
      };
      expect(HashTableUtils.hash(obj, 100)).toBe(42);

      const objWithNegativeHash = {
        hashCode: () => -10
      };
      expect(HashTableUtils.hash(objWithNegativeHash, 100)).toBe(-10);
    });

    test('should handle objects without hashCode method', () => {
      const obj = { a: 1, b: 2 };
      expect(HashTableUtils.hash(obj, 100)).toBeLessThan(100);

      const nestedObj = { a: { b: { c: 3 } } };
      expect(HashTableUtils.hash(nestedObj, 100)).toBeLessThan(100);

      const objWithFunction = { fn: () => console.log('test') };
      expect(HashTableUtils.hash(objWithFunction, 100)).toBeLessThan(100);
    });

    test('should handle null and undefined', () => {
      expect(HashTableUtils.hash(null, 100)).toBeLessThan(100);
      expect(HashTableUtils.hash(undefined, 100)).toBeLessThan(100);
    });

    test('should handle special types', () => {
      expect(HashTableUtils.hash(true, 100)).toBeLessThan(100);
      expect(HashTableUtils.hash(false, 100)).toBeLessThan(100);
      expect(HashTableUtils.hash(Symbol('test'), 100)).toBeLessThan(100);
      expect(HashTableUtils.hash(new Date(), 100)).toBeLessThan(100);
      expect(HashTableUtils.hash(/regex/, 100)).toBeLessThan(100);
      expect(HashTableUtils.hash(BigInt(9007199254740991), 100)).toBeLessThan(100);
    });
  });

  describe('keysEqual', () => {
    test('should handle primitive types', () => {
      expect(HashTableUtils.keysEqual(42, 42)).toBe(true);
      expect(HashTableUtils.keysEqual(42, 43)).toBe(false);
      expect(HashTableUtils.keysEqual('test', 'test')).toBe(true);
      expect(HashTableUtils.keysEqual('test', 'other')).toBe(false);
      expect(HashTableUtils.keysEqual(true, true)).toBe(true);
      expect(HashTableUtils.keysEqual(true, false)).toBe(false);
      expect(HashTableUtils.keysEqual(0, -0)).toBe(true);
      expect(HashTableUtils.keysEqual(NaN, NaN)).toBe(true);
    });

    test('should handle objects with equals method', () => {
      const obj1 = {
        equals: (other: any) => other.value === 42,
        value: 42
      };
      const obj2 = { value: 42 };
      const obj3 = { value: 43 };
      expect(HashTableUtils.keysEqual(obj1, obj2)).toBe(true);
      expect(HashTableUtils.keysEqual(obj1, obj3)).toBe(false);
    });

    test('should handle dates', () => {
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-01-01');
      const date3 = new Date('2023-12-31');
      expect(HashTableUtils.keysEqual(date1, date2)).toBe(true);
      expect(HashTableUtils.keysEqual(date1, date3)).toBe(false);
      expect(HashTableUtils.keysEqual(new Date('Invalid Date'), new Date('Invalid Date'))).toBe(true);
    });

    test('should handle arrays', () => {
      expect(HashTableUtils.keysEqual([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(HashTableUtils.keysEqual([1, 2, 3], [1, 2, 4])).toBe(false);
      expect(HashTableUtils.keysEqual([1, 2], [1, 2, 3])).toBe(false);
      expect(HashTableUtils.keysEqual([], [])).toBe(true);
      expect(HashTableUtils.keysEqual([[1, 2], [3, 4]], [[1, 2], [3, 4]])).toBe(true);
      expect(HashTableUtils.keysEqual([null, undefined], [null, undefined])).toBe(true);
    });

    test('should handle nested objects', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { a: 1, b: { c: 2 } };
      const obj3 = { a: 1, b: { c: 3 } };
      expect(HashTableUtils.keysEqual(obj1, obj2)).toBe(true);
      expect(HashTableUtils.keysEqual(obj1, obj3)).toBe(false);
      expect(HashTableUtils.keysEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })).toBe(true);
      expect(HashTableUtils.keysEqual({}, {})).toBe(true);
    });

    test('should handle null and undefined', () => {
      expect(HashTableUtils.keysEqual(null, null)).toBe(true);
      expect(HashTableUtils.keysEqual(undefined, undefined)).toBe(true);
      expect(HashTableUtils.keysEqual(null, undefined)).toBe(false);
      expect(HashTableUtils.keysEqual(null, 'test')).toBe(false);
      expect(HashTableUtils.keysEqual(undefined, 0)).toBe(false);
      expect(HashTableUtils.keysEqual(null, false)).toBe(false);
    });

    test('should handle regular expressions', () => {
      expect(HashTableUtils.keysEqual(/test/, /test/)).toBe(true);
      expect(HashTableUtils.keysEqual(/test/i, /test/i)).toBe(true);
      expect(HashTableUtils.keysEqual(/test/, /other/)).toBe(false);
      expect(HashTableUtils.keysEqual(/test/i, /test/g)).toBe(false);
      expect(HashTableUtils.keysEqual(/[a-z]+/gim, /[a-z]+/gim)).toBe(true);
      expect(HashTableUtils.keysEqual(/\d+/, /\d+/)).toBe(true);
    });

    test('should handle special cases', () => {
      expect(HashTableUtils.keysEqual(Symbol('test'), Symbol('test'))).toBe(false);
      expect(HashTableUtils.keysEqual(BigInt(42), BigInt(42))).toBe(true);
      expect(HashTableUtils.keysEqual(() => { }, () => { })).toBe(false);
      expect(HashTableUtils.keysEqual(new Set([1, 2]), new Set([1, 2]))).toBe(true);
      expect(HashTableUtils.keysEqual(new Map([[1, 'a']]), new Map([[1, 'a']]))).toBe(true);
    });
  });
});
