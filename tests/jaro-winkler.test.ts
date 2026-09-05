import { jaroWinklerSimilarity } from '../algorithms/jaro-winkler';

describe('jaroWinklerSimilarity', () => {
  describe('Basic Operations', () => {
    test('should return 1 for identical strings', () => {
      expect(jaroWinklerSimilarity('hello', 'hello')).toBe(1);
      expect(jaroWinklerSimilarity('', '')).toBe(1);
      expect(jaroWinklerSimilarity('a', 'a')).toBe(1);
    });

    test('should match well-known name-matching examples', () => {
      expect(jaroWinklerSimilarity('MARTHA', 'MARHTA')).toBeCloseTo(0.961111, 5);
      expect(jaroWinklerSimilarity('DWAYNE', 'DUANE')).toBeCloseTo(0.84, 5);
      expect(jaroWinklerSimilarity('DIXON', 'DICKSONX')).toBeCloseTo(0.813333, 5);
    });

    test('should handle empty strings', () => {
      expect(jaroWinklerSimilarity('', 'abc')).toBe(0);
      expect(jaroWinklerSimilarity('abc', '')).toBe(0);
    });

    test('should handle single character strings', () => {
      expect(jaroWinklerSimilarity('a', 'a')).toBe(1);
      expect(jaroWinklerSimilarity('a', 'b')).toBe(0);
    });
  });

  describe('Prefix Boost', () => {
    test('should boost scores for a shared prefix when Jaro is at least 0.7', () => {
      const withPrefix = jaroWinklerSimilarity('MARTHA', 'MARHTA');
      const jaroOnly = jaroWinklerSimilarity('MARTHA', 'MARHTA', 0);
      expect(withPrefix).toBeGreaterThan(jaroOnly);
    });

    test('should not apply a prefix boost when Jaro is below 0.7', () => {
      const a = 'ABCDEFGHIJ';
      const b = 'ABX';
      expect(jaroWinklerSimilarity(a, b)).toBe(jaroWinklerSimilarity(a, b, 0));
    });

    test('should cap the common prefix at 4 characters', () => {
      const jaro = jaroWinklerSimilarity('ABCDEFGH', 'ABCDEFGZ', 0);
      const jw = jaroWinklerSimilarity('ABCDEFGH', 'ABCDEFGZ');
      // The strings share 7 prefix characters; Winkler still uses l = 4.
      expect(jw).toBeCloseTo(jaro + 4 * 0.1 * (1 - jaro), 10);
    });

    test('should ignore a negative prefix scale', () => {
      expect(jaroWinklerSimilarity('MARTHA', 'MARHTA', -1)).toBeCloseTo(
        jaroWinklerSimilarity('MARTHA', 'MARHTA', 0),
        10
      );
    });

    test('should clamp prefix scale so the result stays at most 1', () => {
      const score = jaroWinklerSimilarity('MARTHA', 'MARHTA', 1);
      expect(score).toBeLessThanOrEqual(1);
      expect(score).toBe(jaroWinklerSimilarity('MARTHA', 'MARHTA', 0.25));
    });
  });

  describe('Edge Cases', () => {
    test('should return 0 for completely different strings', () => {
      expect(jaroWinklerSimilarity('abc', 'xyz')).toBe(0);
    });

    test('should be symmetric', () => {
      expect(jaroWinklerSimilarity('MARTHA', 'MARHTA')).toBeCloseTo(
        jaroWinklerSimilarity('MARHTA', 'MARTHA'),
        10
      );
      expect(jaroWinklerSimilarity('DWAYNE', 'DUANE')).toBeCloseTo(
        jaroWinklerSimilarity('DUANE', 'DWAYNE'),
        10
      );
    });

    test('should be case sensitive', () => {
      expect(jaroWinklerSimilarity('Martha', 'MARTHA')).toBeLessThan(1);
    });

    test('should handle strings of very different lengths', () => {
      const score = jaroWinklerSimilarity('short', 'verylongstring');
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThan(1);
    });

    test('should handle unicode characters', () => {
      expect(jaroWinklerSimilarity('café', 'cafe')).toBeGreaterThan(0.8);
      expect(jaroWinklerSimilarity('café', 'café')).toBe(1);
    });
  });

  describe('Real-world Examples', () => {
    test('should score common typos highly', () => {
      expect(jaroWinklerSimilarity('Jon', 'John')).toBeGreaterThan(0.9);
      expect(jaroWinklerSimilarity('Smith', 'Smyth')).toBeGreaterThan(0.85);
      expect(jaroWinklerSimilarity('Michael', 'Micheal')).toBeGreaterThan(0.9);
    });

    test('should rank a closer name above a distant one', () => {
      const target = 'Jonathan';
      expect(jaroWinklerSimilarity(target, 'Jonathon')).toBeGreaterThan(
        jaroWinklerSimilarity(target, 'Michael')
      );
    });
  });
});
