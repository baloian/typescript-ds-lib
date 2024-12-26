import { HashUtils } from '../lib/hash-utils';
import { Utils } from '../lib/utils';

describe('Utils', () => {
  describe('equals', () => {
    test('should handle primitive types', () => {
      expect(Utils.equals(42, 42)).toBe(true);
      expect(Utils.equals(42, 43)).toBe(false);
      expect(Utils.equals('test', 'test')).toBe(true);
      expect(Utils.equals('test', 'other')).toBe(false);
      expect(Utils.equals(true, true)).toBe(true);
      expect(Utils.equals(true, false)).toBe(false);
      expect(Utils.equals(0, -0)).toBe(true);
      expect(Utils.equals(NaN, NaN)).toBe(true);
    });

  test('should handle objects with equals method', () => {
    const obj1 = {
      equals: (other: any) => other.value === 42,
      value: 42
    };
    const obj2 = { value: 42 };
    const obj3 = { value: 43 };
    expect(Utils.equals(obj1, obj2)).toBe(true);
    expect(Utils.equals(obj1, obj3)).toBe(false);
  });

  test('should handle dates', () => {
    const date1 = new Date('2023-01-01');
    const date2 = new Date('2023-01-01');
    const date3 = new Date('2023-12-31');
    expect(Utils.equals(date1, date2)).toBe(true);
    expect(Utils.equals(date1, date3)).toBe(false);
    expect(Utils.equals(new Date('Invalid Date'), new Date('Invalid Date'))).toBe(true);
  });

  test('should handle arrays', () => {
    expect(Utils.equals([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(Utils.equals([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(Utils.equals([1, 2], [1, 2, 3])).toBe(false);
    expect(Utils.equals([], [])).toBe(true);
    expect(Utils.equals([[1, 2], [3, 4]], [[1, 2], [3, 4]])).toBe(true);
    expect(Utils.equals([null, undefined], [null, undefined])).toBe(true);
    });

  test('should handle nested objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 2 } };
    const obj3 = { a: 1, b: { c: 3 } };
    expect(Utils.equals(obj1, obj2)).toBe(true);
    expect(Utils.equals(obj1, obj3)).toBe(false);
    expect(Utils.equals({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })).toBe(true);
    expect(Utils.equals({}, {})).toBe(true);
  });

  test('should handle null and undefined', () => {
    expect(Utils.equals(null, null)).toBe(true);
    expect(Utils.equals(undefined, undefined)).toBe(true);
    expect(Utils.equals(null, undefined)).toBe(false);
    expect(Utils.equals(null, 'test')).toBe(false);
    expect(Utils.equals(undefined, 0)).toBe(false);
    expect(Utils.equals(null, false)).toBe(false);
  });

  test('should handle regular expressions', () => {
    expect(Utils.equals(/test/, /test/)).toBe(true);
    expect(Utils.equals(/test/i, /test/i)).toBe(true);
    expect(Utils.equals(/test/, /other/)).toBe(false);
    expect(Utils.equals(/test/i, /test/g)).toBe(false);
    expect(Utils.equals(/[a-z]+/gim, /[a-z]+/gim)).toBe(true);
    expect(Utils.equals(/\d+/, /\d+/)).toBe(true);
  });

  test('should handle special cases', () => {
      expect(Utils.equals(Symbol('test'), Symbol('test'))).toBe(false);
      expect(Utils.equals(BigInt(42), BigInt(42))).toBe(true);
      expect(Utils.equals(() => { }, () => { })).toBe(false);
      expect(Utils.equals(new Set([1, 2]), new Set([1, 2]))).toBe(true);
      expect(Utils.equals(new Map([[1, 'a']]), new Map([[1, 'a']]))).toBe(true);
    });
  });
});
