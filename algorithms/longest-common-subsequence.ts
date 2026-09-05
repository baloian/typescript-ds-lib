/**
 * Returns the length of a longest common subsequence (LCS) of two strings.
 *
 * An LCS is a longest sequence of characters that appears in both strings in the
 * same order, but not necessarily contiguously. For example, "ace" is an LCS of
 * "abcde" and "ace".
 *
 * This implementation uses space-optimized dynamic programming with O(min(m, n))
 * space instead of the naive O(m * n) table, where m and n are the lengths of
 * the input strings.
 *
 * Time complexity: O(m * n)
 * Space complexity: O(min(m, n))
 *
 * @param str1 - The first string.
 * @param str2 - The second string.
 * @returns The length of a longest common subsequence (a non-negative integer).
 *
 * @example
 * ```typescript
 * longestCommonSubsequenceLength('ABCDGH', 'AEDFHR'); // Returns 3 ("ADH")
 * longestCommonSubsequenceLength('AGGTAB', 'GXTXAYB'); // Returns 4 ("GTAB")
 * longestCommonSubsequenceLength('abc', 'abc'); // Returns 3
 * longestCommonSubsequenceLength('', 'abc'); // Returns 0
 * ```
 */
export function longestCommonSubsequenceLength(str1: string, str2: string): number {
  if (str1 === str2) {
    return str1.length;
  }
  if (str1.length === 0 || str2.length === 0) {
    return 0;
  }
  // Use the shorter string for the inner dimension to minimize space
  const [longer, shorter] = str1.length >= str2.length ? [str1, str2] : [str2, str1];
  const m = longer.length;
  const n = shorter.length;
  let prevRow: number[] = new Array(n + 1).fill(0);
  let currRow: number[] = new Array(n + 1);
  for (let i = 1; i <= m; i++) {
    currRow[0] = 0;
    for (let j = 1; j <= n; j++) {
      if (longer[i - 1] === shorter[j - 1]) {
        currRow[j] = prevRow[j - 1] + 1;
      } else {
        currRow[j] = Math.max(prevRow[j], currRow[j - 1]);
      }
    }
    [prevRow, currRow] = [currRow, prevRow];
  }
  return prevRow[n];
}

/**
 * Returns a longest common subsequence (LCS) of two strings.
 *
 * An LCS is a longest sequence of characters that appears in both strings in the
 * same order, but not necessarily contiguously. When several subsequences share
 * the same maximum length, one of them is returned.
 *
 * Time complexity: O(m * n)
 * Space complexity: O(m * n)
 *
 * @param str1 - The first string.
 * @param str2 - The second string.
 * @returns A longest common subsequence. An empty string if there is no shared character.
 *
 * @example
 * ```typescript
 * longestCommonSubsequence('ABCDGH', 'AEDFHR'); // Returns "ADH"
 * longestCommonSubsequence('AGGTAB', 'GXTXAYB'); // Returns "GTAB"
 * longestCommonSubsequence('abc', 'abc'); // Returns "abc"
 * longestCommonSubsequence('', 'abc'); // Returns ""
 * ```
 */
export function longestCommonSubsequence(str1: string, str2: string): string {
  if (str1 === str2) {
    return str1;
  }
  if (str1.length === 0 || str2.length === 0) {
    return '';
  }
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  const chars: string[] = [];
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      chars.push(str1[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  chars.reverse();
  return chars.join('');
}
