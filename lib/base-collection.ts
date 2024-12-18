export abstract class BaseCollection<T> {
  /**
   * Checks if the collection is empty. Returns true if the collection is empty, false otherwise.
   */
  abstract isEmpty(): boolean;

  /**
   * Returns the number of elements in the collection.
   */
  abstract size(): number;

  /**
   * Removes all elements from the collection.
   */
  abstract clear(): void;
}
