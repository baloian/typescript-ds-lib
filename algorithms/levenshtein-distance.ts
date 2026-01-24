/**
 * Calculates the Levenshtein distance (edit distance) between two strings.
 * 
 * The Levenshtein distance is the minimum number of single-character edits
 * (insertions, deletions, or substitutions) required to transform one string into another.
 * 
 * This implementation uses space-optimized dynamic programming with O(min(m, n)) space complexity
 * instead of the naive O(m * n) approach, where m and n are the lengths of the input strings.
 * 
 * Time complexity: O(m * n)
 * Space complexity: O(min(m, n))
 * 
 * @param str1 - The first string to compare.
 * @param str2 - The second string to compare.
 * @returns The Levenshtein distance between the two strings (a non-negative integer).
 * 
 * @example
 * ```typescript
 * levenshteinDistance('kitten', 'sitting'); // Returns 3
 * levenshteinDistance('hello', 'hello'); // Returns 0
 * levenshteinDistance('', 'abc'); // Returns 3
 * levenshteinDistance('abc', ''); // Returns 3
 * ```
 */
export function levenshteinDistance(str1: string, str2: string): number {
  // Early termination: if strings are identical, distance is 0
  if (str1 === str2) {
    return 0;
  }
  // Early termination: if one string is empty, distance is the length of the other
  if (str1.length === 0) {
    return str2.length;
  }
  if (str2.length === 0) {
    return str1.length;
  }
  // Use the shorter string for the inner dimension to minimize space
  const [longer, shorter] = str1.length >= str2.length ? [str1, str2] : [str2, str1];
  const m = longer.length;
  const n = shorter.length;
  // Initialize two rows: previous and current
  // prevRow represents the distances for the previous character of the longer string
  let prevRow: number[] = Array.from({ length: n + 1 }, (_, i) => i);
  let currRow: number[] = new Array(n + 1);
  // Fill the DP table row by row
  for (let i = 1; i <= m; i++) {
    currRow[0] = i; // Cost of deleting all characters up to i in longer string
    for (let j = 1; j <= n; j++) {
      // If characters match, no operation needed (take diagonal value)
      if (longer[i - 1] === shorter[j - 1]) {
        currRow[j] = prevRow[j - 1];
      } else {
        // Take minimum of three operations:
        // 1. Deletion: prevRow[j] + 1
        // 2. Insertion: currRow[j - 1] + 1
        // 3. Substitution: prevRow[j - 1] + 1
        currRow[j] = Math.min(
          prevRow[j] + 1,      // deletion
          currRow[j - 1] + 1,  // insertion
          prevRow[j - 1] + 1   // substitution
        );
      }
    }
    // Swap rows for next iteration
    [prevRow, currRow] = [currRow, prevRow];
  }
  // The result is in prevRow[n] (since we swapped at the end)
  return prevRow[n];
}
