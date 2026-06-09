import { Trie } from '../data-structures/trie';

describe('Trie', () => {
  let trie: Trie<string, number>;

  beforeEach(() => {
    trie = new Trie<string, number>();
  });

  describe('initialization', () => {
    test('should start empty', () => {
      expect(trie.isEmpty()).toBe(true);
      expect(trie.size()).toBe(0);
    });
  });

  describe('insertion and lookup', () => {
    test('should insert and find values', () => {
      trie.insert('app', 1);
      trie.insert('apple', 2);
      trie.insert('bat', 3);

      expect(trie.size()).toBe(3);
      expect(trie.find('app')).toBe(1);
      expect(trie.find('apple')).toBe(2);
      expect(trie.find('bat')).toBe(3);
      expect(trie.find('missing')).toBeUndefined();
    });

    test('should overwrite existing key without changing size', () => {
      trie.insert('app', 1);
      trie.insert('app', 9);

      expect(trie.size()).toBe(1);
      expect(trie.find('app')).toBe(9);
    });

    test('should handle empty string keys', () => {
      trie.insert('', 42);

      expect(trie.size()).toBe(1);
      expect(trie.find('')).toBe(42);
      expect(trie.has('')).toBe(true);
    });
  });

  describe('membership and prefixes', () => {
    beforeEach(() => {
      trie.insert('app', 1);
      trie.insert('apple', 2);
      trie.insert('application', 3);
      trie.insert('bat', 4);
    });

    test('should check key existence with has', () => {
      expect(trie.has('app')).toBe(true);
      expect(trie.has('apple')).toBe(true);
      expect(trie.has('appl')).toBe(false);
      expect(trie.has('bats')).toBe(false);
    });

    test('should check prefixes with hasPrefix', () => {
      expect(trie.hasPrefix('app')).toBe(true);
      expect(trie.hasPrefix('appl')).toBe(true);
      expect(trie.hasPrefix('ba')).toBe(true);
      expect(trie.hasPrefix('cat')).toBe(false);
    });

    test('should return values for matching prefix', () => {
      const values = trie.valuesWithPrefix('app').sort((a, b) => a - b);
      expect(values).toEqual([1, 2, 3]);
    });

    test('should return entries for matching prefix', () => {
      const entries = trie.entriesWithPrefix('app').sort(([a], [b]) => a.localeCompare(b));

      expect(entries).toEqual([
        ['app', 1],
        ['apple', 2],
        ['application', 3]
      ]);
    });
  });

  describe('deletion', () => {
    test('should remove existing key', () => {
      trie.insert('app', 1);
      trie.insert('apple', 2);

      expect(trie.remove('app')).toBe(true);
      expect(trie.find('app')).toBeUndefined();
      expect(trie.find('apple')).toBe(2);
      expect(trie.size()).toBe(1);
    });

    test('should return false when removing missing key', () => {
      trie.insert('app', 1);

      expect(trie.remove('missing')).toBe(false);
      expect(trie.size()).toBe(1);
    });
  });

  describe('iteration and equality', () => {
    test('should iterate through all entries', () => {
      trie.insert('cat', 1);
      trie.insert('car', 2);
      trie.insert('dog', 3);

      const seen = new Map<string, number>();
      trie.forEach((key, value) => {
        seen.set(key, value);
      });

      expect(seen.get('cat')).toBe(1);
      expect(seen.get('car')).toBe(2);
      expect(seen.get('dog')).toBe(3);
      expect(seen.size).toBe(3);
    });

    test('should compare tries for equality', () => {
      const trie1 = new Trie<string, number>();
      const trie2 = new Trie<string, number>();

      trie1.insert('a', 1);
      trie1.insert('ab', 2);

      trie2.insert('a', 1);
      trie2.insert('ab', 2);

      expect(trie1.equals(trie2)).toBe(true);
      trie2.insert('abc', 3);
      expect(trie1.equals(trie2)).toBe(false);
    });
  });

  describe('clear', () => {
    test('should clear all entries', () => {
      trie.insert('a', 1);
      trie.insert('ab', 2);
      trie.insert('abc', 3);

      trie.clear();

      expect(trie.size()).toBe(0);
      expect(trie.isEmpty()).toBe(true);
      expect(trie.find('a')).toBeUndefined();
      expect(trie.hasPrefix('a')).toBe(false);
    });
  });

  describe('custom tokenization', () => {
    test('should support non-string keys with custom tokenizer', () => {
      type NumberKey = number[];
      const customTrie = new Trie<NumberKey, string, number>({
        tokenize: (key) => key,
        detokenize: (tokens) => [...tokens]
      });

      customTrie.insert([1, 2, 3], 'a');
      customTrie.insert([1, 2, 4], 'b');

      expect(customTrie.find([1, 2, 3])).toBe('a');
      expect(customTrie.find([1, 2, 4])).toBe('b');
      expect(customTrie.hasPrefix([1, 2])).toBe(true);
      expect(customTrie.entriesWithPrefix([1, 2])).toHaveLength(2);
    });
  });
});
