import { binarySearch } from '../algorithms/binary-search';

describe('binarySearch', () => {
  describe('Basic Search Operations', () => {
    test('should find target in sorted array', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      expect(binarySearch(arr, 5)).toBe(4);
      expect(binarySearch(arr, 1)).toBe(0);
      expect(binarySearch(arr, 10)).toBe(9);
    });

    test('should return -1 when target not found', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      expect(binarySearch(arr, 11)).toBe(-1);
      expect(binarySearch(arr, 0)).toBe(-1);
      expect(binarySearch(arr, 5.5)).toBe(-1);
    });

    test('should handle single element array', () => {
      expect(binarySearch([5], 5)).toBe(0);
      expect(binarySearch([5], 3)).toBe(-1);
      expect(binarySearch([5], 7)).toBe(-1);
    });

    test('should handle empty array', () => {
      expect(binarySearch([], 5)).toBe(-1);
    });

    test('should handle two element array', () => {
      const arr = [1, 2];
      expect(binarySearch(arr, 1)).toBe(0);
      expect(binarySearch(arr, 2)).toBe(1);
      expect(binarySearch(arr, 0)).toBe(-1);
      expect(binarySearch(arr, 3)).toBe(-1);
    });
  });

  describe('Edge Cases', () => {
    test('should find target at beginning of array', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(binarySearch(arr, 1)).toBe(0);
    });

    test('should find target at end of array', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(binarySearch(arr, 5)).toBe(4);
    });

    test('should find target in middle of array', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(binarySearch(arr, 3)).toBe(2);
    });

    test('should handle array with duplicate values', () => {
      const arr = [1, 2, 2, 2, 3, 4, 5];
      // Should return one of the indices where the value is found
      const index = binarySearch(arr, 2);
      expect(index).toBeGreaterThanOrEqual(1);
      expect(index).toBeLessThanOrEqual(3);
      expect(arr[index]).toBe(2);
    });

    test('should handle large array', () => {
      const arr = Array.from({ length: 1000 }, (_, i) => i + 1);
      expect(binarySearch(arr, 500)).toBe(499);
      expect(binarySearch(arr, 1)).toBe(0);
      expect(binarySearch(arr, 1000)).toBe(999);
      expect(binarySearch(arr, 1001)).toBe(-1);
    });

    test('should handle negative numbers', () => {
      const arr = [-10, -5, -3, -1, 0, 1, 3, 5, 10];
      expect(binarySearch(arr, -10)).toBe(0);
      expect(binarySearch(arr, 0)).toBe(4);
      expect(binarySearch(arr, 10)).toBe(8);
      expect(binarySearch(arr, -7)).toBe(-1);
    });
  });

  describe('Custom Comparison Function', () => {
    test('should work with custom numeric comparator', () => {
      const arr = [10, 8, 6, 4, 2];
      const compare = (a: number, b: number) => b - a; // Descending order
      expect(binarySearch(arr, 6, compare)).toBe(2);
      expect(binarySearch(arr, 10, compare)).toBe(0);
      expect(binarySearch(arr, 2, compare)).toBe(4);
      expect(binarySearch(arr, 5, compare)).toBe(-1);
    });

    test('should work with string array and custom comparator', () => {
      // Test with ascending order (standard string comparison)
      const arrAsc = ['ant', 'cat', 'elephant', 'monkey', 'zebra'];
      const compare = (a: string, b: string) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      };
      expect(binarySearch(arrAsc, 'monkey', compare)).toBe(3);
      expect(binarySearch(arrAsc, 'ant', compare)).toBe(0);
      expect(binarySearch(arrAsc, 'zebra', compare)).toBe(4);

      // Test with descending order (reverse string comparison)
      const arrDesc = ['zebra', 'monkey', 'elephant', 'cat', 'ant'];
      const descCompare = (a: string, b: string) => {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
      };
      expect(binarySearch(arrDesc, 'monkey', descCompare)).toBe(1);
      expect(binarySearch(arrDesc, 'zebra', descCompare)).toBe(0);
      expect(binarySearch(arrDesc, 'ant', descCompare)).toBe(4);
    });

    test('should work with object array and custom comparator', () => {
      interface Person {
        name: string;
        age: number;
      }
      const arr: Person[] = [
        { name: 'Alice', age: 20 },
        { name: 'Bob', age: 25 },
        { name: 'Charlie', age: 30 },
        { name: 'David', age: 35 },
      ];
      const compare = (a: Person, b: Person) => a.age - b.age;
      expect(binarySearch(arr, { name: 'Bob', age: 25 }, compare)).toBe(1);
      expect(binarySearch(arr, { name: 'Alice', age: 20 }, compare)).toBe(0);
      expect(binarySearch(arr, { name: 'Eve', age: 40 }, compare)).toBe(-1);
    });

    test('should work with custom comparator for string length', () => {
      const arr = ['a', 'bb', 'ccc', 'dddd', 'eeeee'];
      const compare = (a: string, b: string) => a.length - b.length;
      expect(binarySearch(arr, 'ccc', compare)).toBe(2);
      expect(binarySearch(arr, 'a', compare)).toBe(0);
      expect(binarySearch(arr, 'eeeee', compare)).toBe(4);
      expect(binarySearch(arr, 'xxxxx', compare)).toBe(4); // Same length
    });
  });

  describe('Different Data Types', () => {
    test('should work with string array', () => {
      const arr = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
      expect(binarySearch(arr, 'cherry')).toBe(2);
      expect(binarySearch(arr, 'apple')).toBe(0);
      expect(binarySearch(arr, 'elderberry')).toBe(4);
      expect(binarySearch(arr, 'grape')).toBe(-1);
    });

    test('should work with floating point numbers', () => {
      const arr = [1.1, 2.2, 3.3, 4.4, 5.5];
      expect(binarySearch(arr, 3.3)).toBe(2);
      expect(binarySearch(arr, 1.1)).toBe(0);
      expect(binarySearch(arr, 5.5)).toBe(4);
      expect(binarySearch(arr, 2.5)).toBe(-1);
    });

    test('should work with mixed positive and negative numbers', () => {
      const arr = [-5, -3, -1, 0, 1, 3, 5];
      expect(binarySearch(arr, -5)).toBe(0);
      expect(binarySearch(arr, 0)).toBe(3);
      expect(binarySearch(arr, 5)).toBe(6);
      expect(binarySearch(arr, -2)).toBe(-1);
    });
  });

  describe('Special Scenarios', () => {
    test('should handle array with all same values', () => {
      const arr = [5, 5, 5, 5, 5];
      const index = binarySearch(arr, 5);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(arr.length);
      expect(arr[index]).toBe(5);
      expect(binarySearch(arr, 4)).toBe(-1);
      expect(binarySearch(arr, 6)).toBe(-1);
    });

    test('should handle odd length arrays', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(binarySearch(arr, 3)).toBe(2);
      expect(binarySearch(arr, 1)).toBe(0);
      expect(binarySearch(arr, 5)).toBe(4);
    });

    test('should handle even length arrays', () => {
      const arr = [1, 2, 3, 4, 5, 6];
      expect(binarySearch(arr, 3)).toBe(2);
      expect(binarySearch(arr, 4)).toBe(3);
      expect(binarySearch(arr, 1)).toBe(0);
      expect(binarySearch(arr, 6)).toBe(5);
    });

    test('should handle array with gaps', () => {
      const arr = [1, 3, 5, 7, 9, 11, 13];
      expect(binarySearch(arr, 7)).toBe(3);
      expect(binarySearch(arr, 1)).toBe(0);
      expect(binarySearch(arr, 13)).toBe(6);
      expect(binarySearch(arr, 2)).toBe(-1);
      expect(binarySearch(arr, 6)).toBe(-1);
    });
  });
});

