import {
  longestCommonSubsequence,
  longestCommonSubsequenceLength,
} from '../algorithms/longest-common-subsequence';

function isSubsequence(sub: string, str: string): boolean {
  let i = 0;
  for (let j = 0; j < str.length && i < sub.length; j++) {
    if (sub[i] === str[j]) {
      i++;
    }
  }
  return i === sub.length;
}

describe('longestCommonSubsequenceLength', () => {
  describe('Basic Operations', () => {
    test('should return the full length for identical strings', () => {
      expect(longestCommonSubsequenceLength('hello', 'hello')).toBe(5);
      expect(longestCommonSubsequenceLength('', '')).toBe(0);
      expect(longestCommonSubsequenceLength('a', 'a')).toBe(1);
    });

    test('should calculate length for classic examples', () => {
      expect(longestCommonSubsequenceLength('ABCDGH', 'AEDFHR')).toBe(3);
      expect(longestCommonSubsequenceLength('AGGTAB', 'GXTXAYB')).toBe(4);
      expect(longestCommonSubsequenceLength('abcde', 'ace')).toBe(3);
    });

    test('should handle empty strings', () => {
      expect(longestCommonSubsequenceLength('', 'abc')).toBe(0);
      expect(longestCommonSubsequenceLength('abc', '')).toBe(0);
    });

    test('should handle single character strings', () => {
      expect(longestCommonSubsequenceLength('a', 'b')).toBe(0);
      expect(longestCommonSubsequenceLength('a', 'a')).toBe(1);
      expect(longestCommonSubsequenceLength('a', 'ab')).toBe(1);
    });
  });

  describe('Edge Cases', () => {
    test('should return 0 for strings with no characters in common', () => {
      expect(longestCommonSubsequenceLength('abc', 'xyz')).toBe(0);
      expect(longestCommonSubsequenceLength('foo', 'bar')).toBe(0);
    });

    test('should handle completely overlapping shorter string', () => {
      expect(longestCommonSubsequenceLength('abc', 'abcde')).toBe(3);
      expect(longestCommonSubsequenceLength('abcde', 'abc')).toBe(3);
    });

    test('should handle reversed strings', () => {
      expect(longestCommonSubsequenceLength('abc', 'cba')).toBe(1);
    });

    test('should handle repeated characters', () => {
      expect(longestCommonSubsequenceLength('aaa', 'aa')).toBe(2);
      expect(longestCommonSubsequenceLength('aaaa', 'aabb')).toBe(2);
    });
  });

  describe('Properties', () => {
    test('should be symmetric', () => {
      expect(longestCommonSubsequenceLength('ABCDGH', 'AEDFHR')).toBe(
        longestCommonSubsequenceLength('AEDFHR', 'ABCDGH')
      );
    });

    test('should not exceed the shorter string length', () => {
      expect(longestCommonSubsequenceLength('short', 'verylongstring')).toBeLessThanOrEqual(5);
    });

    test('should handle unicode characters', () => {
      expect(longestCommonSubsequenceLength('café', 'cafe')).toBe(3);
      expect(longestCommonSubsequenceLength('naïve', 'naive')).toBe(4);
    });
  });
});

describe('longestCommonSubsequence', () => {
  describe('Basic Operations', () => {
    test('should return the string itself when inputs are identical', () => {
      expect(longestCommonSubsequence('hello', 'hello')).toBe('hello');
      expect(longestCommonSubsequence('', '')).toBe('');
    });

    test('should return a classic LCS', () => {
      expect(longestCommonSubsequence('ABCDGH', 'AEDFHR')).toBe('ADH');
      expect(longestCommonSubsequence('AGGTAB', 'GXTXAYB')).toBe('GTAB');
      expect(longestCommonSubsequence('abcde', 'ace')).toBe('ace');
    });

    test('should handle empty strings', () => {
      expect(longestCommonSubsequence('', 'abc')).toBe('');
      expect(longestCommonSubsequence('abc', '')).toBe('');
    });
  });

  describe('Edge Cases', () => {
    test('should return an empty string when there is no common character', () => {
      expect(longestCommonSubsequence('abc', 'xyz')).toBe('');
    });

    test('should return a subsequence of both inputs', () => {
      const pairs: Array<[string, string]> = [
        ['ABCDGH', 'AEDFHR'],
        ['AGGTAB', 'GXTXAYB'],
        ['abc', 'acb'],
        ['aab', 'azb'],
        ['hello world', 'hallo word'],
      ];
      for (const [a, b] of pairs) {
        const lcs = longestCommonSubsequence(a, b);
        expect(isSubsequence(lcs, a)).toBe(true);
        expect(isSubsequence(lcs, b)).toBe(true);
      }
    });

    test('should agree with longestCommonSubsequenceLength', () => {
      const pairs: Array<[string, string]> = [
        ['ABCDGH', 'AEDFHR'],
        ['AGGTAB', 'GXTXAYB'],
        ['abc', 'xyz'],
        ['hello', 'hello'],
        ['', 'abc'],
        ['aaa', 'aa'],
        ['kitten', 'sitting'],
      ];
      for (const [a, b] of pairs) {
        expect(longestCommonSubsequence(a, b).length).toBe(longestCommonSubsequenceLength(a, b));
      }
    });

    test('should handle repeated characters', () => {
      expect(longestCommonSubsequence('aaa', 'aa')).toBe('aa');
      expect(longestCommonSubsequence('aab', 'azb')).toBe('ab');
    });

    test('should handle unicode characters', () => {
      expect(longestCommonSubsequence('café', 'cafe')).toBe('caf');
    });

    test('should handle spaces and special characters', () => {
      expect(longestCommonSubsequence('hello world', 'helloworld')).toBe('helloworld');
      expect(longestCommonSubsequence('a-b-c', 'abc')).toBe('abc');
    });
  });
});
