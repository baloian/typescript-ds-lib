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
});
