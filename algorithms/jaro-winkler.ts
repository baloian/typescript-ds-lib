const DEFAULT_PREFIX_SCALE = 0.1;
const MAX_PREFIX_SCALE = 0.25;
const PREFIX_BOOST_THRESHOLD = 0.7;
const MAX_PREFIX_LENGTH = 4;

/**
 * Calculates the Jaro similarity of two strings.
 *
 * Matching characters are counted only when they fall within a sliding window
 * of floor(max(|s1|, |s2|) / 2) - 1. Transpositions are matching characters
 * that appear in a different order.
 *
 * Time complexity: O(m * n) in the worst case, where m and n are the string lengths.
 * Space complexity: O(m + n)
 *
 * @returns A similarity score in [0, 1]. 1 means the strings are identical.
 */
function jaroSimilarity(str1: string, str2: string): number {
  if (str1 === str2) {
    return 1;
  }
  if (str1.length === 0 || str2.length === 0) {
    return 0;
  }

  const matchDistance = Math.max(0, Math.floor(Math.max(str1.length, str2.length) / 2) - 1);
  const str1Matches: boolean[] = new Array(str1.length).fill(false);
  const str2Matches: boolean[] = new Array(str2.length).fill(false);

  let matches = 0;
  for (let i = 0; i < str1.length; i++) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(i + matchDistance + 1, str2.length);
    for (let j = start; j < end; j++) {
      if (str2Matches[j] || str1[i] !== str2[j]) {
        continue;
      }
      str1Matches[i] = true;
      str2Matches[j] = true;
      matches++;
      break;
    }
  }

  if (matches === 0) {
    return 0;
  }

  let transpositions = 0;
  let k = 0;
  for (let i = 0; i < str1.length; i++) {
    if (!str1Matches[i]) {
      continue;
    }
    while (!str2Matches[k]) {
      k++;
    }
    if (str1[i] !== str2[k]) {
      transpositions++;
    }
    k++;
  }

  return (
    (matches / str1.length +
      matches / str2.length +
      (matches - transpositions / 2) / matches) /
    3
  );
}

/**
 * Calculates the Jaro–Winkler similarity of two strings.
 *
 * Jaro–Winkler boosts the Jaro similarity when the strings share a common
 * prefix (up to 4 characters). The prefix bonus is applied only when the Jaro
 * score is at least 0.7, which is the original Winkler threshold used for
 * name matching.
 *
 * Unlike Levenshtein distance, a higher score means the strings are more
 * similar. JavaScript has no built-in equivalent.
 *
 * Time complexity: O(m * n) in the worst case, where m and n are the string lengths.
 * Space complexity: O(m + n)
 *
 * @param str1 - The first string to compare.
 * @param str2 - The second string to compare.
 * @param prefixScale - How much a common prefix boosts the score. Standard
 *   value is 0.1. Values are clamped to [0, 0.25] so the result cannot exceed 1.
 * @returns A similarity score in [0, 1]. 1 means the strings are identical.
 *
 * @example
 * ```typescript
 * jaroWinklerSimilarity('MARTHA', 'MARHTA'); // ~0.961
 * jaroWinklerSimilarity('DWAYNE', 'DUANE'); // ~0.840
 * jaroWinklerSimilarity('hello', 'hello'); // 1
 * jaroWinklerSimilarity('', 'abc'); // 0
 * ```
 */
export function jaroWinklerSimilarity(
  str1: string,
  str2: string,
  prefixScale: number = DEFAULT_PREFIX_SCALE
): number {
  const jaro = jaroSimilarity(str1, str2);
  if (jaro < PREFIX_BOOST_THRESHOLD) {
    return jaro;
  }
  const scale = Math.min(MAX_PREFIX_SCALE, Math.max(0, prefixScale));
  const maxPrefix = Math.min(MAX_PREFIX_LENGTH, str1.length, str2.length);
  let prefix = 0;
  while (prefix < maxPrefix && str1[prefix] === str2[prefix]) {
    prefix++;
  }
  return jaro + prefix * scale * (1 - jaro);
}
