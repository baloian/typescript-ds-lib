import { HashUtils } from '../lib/hash-utils';

describe('HashUtils', () => {
  describe('hash', () => {
    test('should handle numbers', () => {
      expect(HashUtils.hash(42, 100)).toBeLessThan(100);
      expect(HashUtils.hash(-42, 100)).toBeLessThan(100);
      expect(HashUtils.hash(0, 100)).toBeLessThan(100);
      expect(HashUtils.hash(Number.MAX_SAFE_INTEGER, 100)).toBeLessThan(100);
      expect(HashUtils.hash(Number.MIN_SAFE_INTEGER, 100)).toBeLessThan(100);
    });

    test('should handle strings', () => {
      expect(HashUtils.hash('test', 100)).toBeLessThan(100);
      expect(HashUtils.hash('', 100)).toBeLessThan(100);
      expect(HashUtils.hash('long string with spaces', 100)).toBeLessThan(100);
      expect(HashUtils.hash('🚀', 100)).toBeLessThan(100); // Unicode characters
      expect(HashUtils.hash('\n\t\r', 100)).toBeLessThan(100); // Special characters
    });

    test('should handle objects with hashCode method', () => {
      const obj = {
        hashCode: () => 42
      };
      expect(HashUtils.hash(obj, 100)).toBe(42);

      const objWithNegativeHash = {
        hashCode: () => -10
      };
      expect(HashUtils.hash(objWithNegativeHash, 100)).toBe(-10);
    });

    test('should handle objects without hashCode method', () => {
      const obj = { a: 1, b: 2 };
      expect(HashUtils.hash(obj, 100)).toBeLessThan(100);

      const nestedObj = { a: { b: { c: 3 } } };
      expect(HashUtils.hash(nestedObj, 100)).toBeLessThan(100);

      const objWithFunction = { fn: () => console.log('test') };
      expect(HashUtils.hash(objWithFunction, 100)).toBeLessThan(100);
    });

    test('should handle null and undefined', () => {
      expect(HashUtils.hash(null, 100)).toBeLessThan(100);
      expect(HashUtils.hash(undefined, 100)).toBeLessThan(100);
    });

    test('should handle special types', () => {
      expect(HashUtils.hash(true, 100)).toBeLessThan(100);
      expect(HashUtils.hash(false, 100)).toBeLessThan(100);
      expect(HashUtils.hash(Symbol('test'), 100)).toBeLessThan(100);
      expect(HashUtils.hash(new Date(), 100)).toBeLessThan(100);
      expect(HashUtils.hash(/regex/, 100)).toBeLessThan(100);
      expect(HashUtils.hash(BigInt(9007199254740991), 100)).toBeLessThan(100);
    });
  });

  describe('keysEqual', () => {
    test('should handle primitive types', () => {
      expect(HashUtils.equals(42, 42)).toBe(true);
      expect(HashUtils.equals(42, 43)).toBe(false);
      expect(HashUtils.equals('test', 'test')).toBe(true);
      expect(HashUtils.equals('test', 'other')).toBe(false);
      expect(HashUtils.equals(true, true)).toBe(true);
      expect(HashUtils.equals(true, false)).toBe(false);
      expect(HashUtils.equals(0, -0)).toBe(true);
      expect(HashUtils.equals(NaN, NaN)).toBe(true);
    });

    test('should handle objects with equals method', () => {
      const obj1 = {
        equals: (other: any) => other.value === 42,
        value: 42
      };
      const obj2 = { value: 42 };
      const obj3 = { value: 43 };
      expect(HashUtils.equals(obj1, obj2)).toBe(true);
      expect(HashUtils.equals(obj1, obj3)).toBe(false);
    });

    test('should handle dates', () => {
      const date1 = new Date('2023-01-01');
      const date2 = new Date('2023-01-01');
      const date3 = new Date('2023-12-31');
      expect(HashUtils.equals(date1, date2)).toBe(true);
      expect(HashUtils.equals(date1, date3)).toBe(false);
      expect(HashUtils.equals(new Date('Invalid Date'), new Date('Invalid Date'))).toBe(true);
    });

    test('should handle arrays', () => {
      expect(HashUtils.equals([1, 2, 3], [1, 2, 3])).toBe(true);
      expect(HashUtils.equals([1, 2, 3], [1, 2, 4])).toBe(false);
      expect(HashUtils.equals([1, 2], [1, 2, 3])).toBe(false);
      expect(HashUtils.equals([], [])).toBe(true);
      expect(HashUtils.equals([[1, 2], [3, 4]], [[1, 2], [3, 4]])).toBe(true);
      expect(HashUtils.equals([null, undefined], [null, undefined])).toBe(true);
    });

    test('should handle nested objects', () => {
      const obj1 = { a: 1, b: { c: 2 } };
      const obj2 = { a: 1, b: { c: 2 } };
      const obj3 = { a: 1, b: { c: 3 } };
      expect(HashUtils.equals(obj1, obj2)).toBe(true);
      expect(HashUtils.equals(obj1, obj3)).toBe(false);
      expect(HashUtils.equals({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })).toBe(true);
      expect(HashUtils.equals({}, {})).toBe(true);
    });

    test('should handle null and undefined', () => {
      expect(HashUtils.equals(null, null)).toBe(true);
      expect(HashUtils.equals(undefined, undefined)).toBe(true);
      expect(HashUtils.equals(null, undefined)).toBe(false);
      expect(HashUtils.equals(null, 'test')).toBe(false);
      expect(HashUtils.equals(undefined, 0)).toBe(false);
      expect(HashUtils.equals(null, false)).toBe(false);
    });

    test('should handle regular expressions', () => {
      expect(HashUtils.equals(/test/, /test/)).toBe(true);
      expect(HashUtils.equals(/test/i, /test/i)).toBe(true);
      expect(HashUtils.equals(/test/, /other/)).toBe(false);
      expect(HashUtils.equals(/test/i, /test/g)).toBe(false);
      expect(HashUtils.equals(/[a-z]+/gim, /[a-z]+/gim)).toBe(true);
      expect(HashUtils.equals(/\d+/, /\d+/)).toBe(true);
    });

    test('should handle special cases', () => {
      expect(HashUtils.equals(Symbol('test'), Symbol('test'))).toBe(false);
      expect(HashUtils.equals(BigInt(42), BigInt(42))).toBe(true);
      expect(HashUtils.equals(() => { }, () => { })).toBe(false);
      expect(HashUtils.equals(new Set([1, 2]), new Set([1, 2]))).toBe(true);
      expect(HashUtils.equals(new Map([[1, 'a']]), new Map([[1, 'a']]))).toBe(true);
    });
  });
});
