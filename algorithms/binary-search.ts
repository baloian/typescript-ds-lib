/**
 * Performs a binary search on a sorted array to locate a target element.
 * 
 * This function assumes that the input array is sorted in ascending order with respect to the comparison logic.
 * It accepts an optional comparison function for custom sorting logic; if not provided,
 * native < and > operators are used.
 * 
 * @param arr - A sorted array of elements of type T.
 * @param target - The element to search for within the array.
 * @param compare - (Optional) A comparison function that returns a negative value if the first argument is less
 *                  than the second, a positive value if the first is greater, and zero if they are considered equal.
 * @returns The index of the target element if it is found in the array; otherwise, returns -1.
 */
export function binarySearch<T>(arr: T[], target: T, compare?: (a: T, b: T) => number): number {
  let left = 0;
  let right = arr.length - 1;
  const cmp = compare ? compare : (a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0);
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const comparison = cmp(arr[mid], target);
    if (comparison === 0) {
      return mid;
    }
    if (comparison < 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

