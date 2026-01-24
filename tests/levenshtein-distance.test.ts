import { levenshteinDistance } from '../algorithms/levenshtein-distance';

describe('levenshteinDistance', () => {
  describe('Basic Operations', () => {
    test('should return 0 for identical strings', () => {
      expect(levenshteinDistance('hello', 'hello')).toBe(0);
      expect(levenshteinDistance('', '')).toBe(0);
      expect(levenshteinDistance('a', 'a')).toBe(0);
    });

    test('should calculate distance for simple cases', () => {
      expect(levenshteinDistance('kitten', 'sitting')).toBe(3);
      expect(levenshteinDistance('saturday', 'sunday')).toBe(3);
      expect(levenshteinDistance('hello', 'hallo')).toBe(1);
    });

    test('should handle empty strings', () => {
      expect(levenshteinDistance('', 'abc')).toBe(3);
      expect(levenshteinDistance('abc', '')).toBe(3);
      expect(levenshteinDistance('', '')).toBe(0);
    });

    test('should handle single character strings', () => {
      expect(levenshteinDistance('a', 'b')).toBe(1);
      expect(levenshteinDistance('a', 'ab')).toBe(1);
      expect(levenshteinDistance('ab', 'a')).toBe(1);
    });
  });

  describe('Edge Cases', () => {
    test('should handle strings of different lengths', () => {
      expect(levenshteinDistance('short', 'verylongstring')).toBe(12);
      expect(levenshteinDistance('verylongstring', 'short')).toBe(12);
    });

    test('should handle completely different strings', () => {
      expect(levenshteinDistance('abc', 'xyz')).toBe(3);
      expect(levenshteinDistance('foo', 'bar')).toBe(3);
    });

    test('should handle strings with same characters in different order', () => {
      expect(levenshteinDistance('abc', 'cba')).toBe(2);
      expect(levenshteinDistance('abcd', 'dcba')).toBe(4);
    });

    test('should handle strings with repeated characters', () => {
      expect(levenshteinDistance('aaa', 'bbb')).toBe(3);
      expect(levenshteinDistance('aaaa', 'aaab')).toBe(1);
      expect(levenshteinDistance('aaaa', 'aaaa')).toBe(0);
    });
  });

  describe('Real-world Examples', () => {
    test('should handle common typos', () => {
      expect(levenshteinDistance('recieve', 'receive')).toBe(2);
      expect(levenshteinDistance('seperate', 'separate')).toBe(1);
      expect(levenshteinDistance('accomodate', 'accommodate')).toBe(1);
    });

    test('should handle word variations', () => {
      expect(levenshteinDistance('color', 'colour')).toBe(1);
      expect(levenshteinDistance('organize', 'organise')).toBe(1);
      expect(levenshteinDistance('theater', 'theatre')).toBe(2);
    });

    test('should handle names', () => {
      expect(levenshteinDistance('John', 'Jon')).toBe(1);
      expect(levenshteinDistance('Smith', 'Smyth')).toBe(1);
      expect(levenshteinDistance('Michael', 'Micheal')).toBe(2);
    });
  });

  describe('Performance and Correctness', () => {
    test('should handle long strings efficiently', () => {
      const str1 = 'a'.repeat(100);
      const str2 = 'b'.repeat(100);
      expect(levenshteinDistance(str1, str2)).toBe(100);
    });

    test('should handle strings with many matches', () => {
      expect(levenshteinDistance('abcdefgh', 'abcdefgh')).toBe(0);
      expect(levenshteinDistance('abcdefgh', 'abcdefgx')).toBe(1);
    });

    test('should handle unicode characters', () => {
      expect(levenshteinDistance('café', 'cafe')).toBe(1);
      expect(levenshteinDistance('naïve', 'naive')).toBe(1);
      expect(levenshteinDistance('résumé', 'resume')).toBe(2);
    });

    test('should be symmetric for identical operations', () => {
      const str1 = 'hello world';
      const str2 = 'hallo word';
      expect(levenshteinDistance(str1, str2)).toBe(levenshteinDistance(str2, str1));
    });

    test('should satisfy triangle inequality', () => {
      const a = 'abc';
      const b = 'def';
      const c = 'ghi';
      const ab = levenshteinDistance(a, b);
      const bc = levenshteinDistance(b, c);
      const ac = levenshteinDistance(a, c);
      // Triangle inequality: d(a,c) <= d(a,b) + d(b,c)
      expect(ac).toBeLessThanOrEqual(ab + bc);
    });
  });

  describe('Special Characters', () => {
    test('should handle strings with spaces', () => {
      expect(levenshteinDistance('hello world', 'helloworld')).toBe(1);
      expect(levenshteinDistance('hello world', 'hello  world')).toBe(1);
    });

    test('should handle strings with numbers', () => {
      expect(levenshteinDistance('abc123', 'abc456')).toBe(3);
      expect(levenshteinDistance('123', '456')).toBe(3);
    });

    test('should handle strings with special characters', () => {
      expect(levenshteinDistance('hello!', 'hello?')).toBe(1);
      expect(levenshteinDistance('test@test', 'test#test')).toBe(1);
    });
  });
});
