export class Utils {
  static equals<K>(key1: K, key2: K): boolean {
    if (key1 === key2) return true;
    if (key1 == null || key2 == null) return key1 === key2;

    // Check for custom equals method
    if (typeof (key1 as any).equals === 'function') {
      return (key1 as any).equals(key2);
    }

    // Handle NaN values
    if (typeof key1 === 'number' && typeof key2 === 'number') {
      // NaN is the only value that isn't equal to itself.
      return key1 === key2 || (isNaN(key1 as number) && isNaN(key2 as number));
    }

    // Handle special object types
    if (key1 instanceof Date) {
      return (
        key2 instanceof Date &&
        (key1.getTime() === key2.getTime() || (isNaN(key1.getTime()) && isNaN(key2.getTime())))
      );
    }

    if (key1 instanceof RegExp) {
      return key2 instanceof RegExp && key1.toString() === key2.toString();
    }

    // Handle plain objects
    if (typeof key1 === 'object' && typeof key2 === 'object') {
      const keys1 = Object.keys(key1);
      const keys2 = Object.keys(key2);
      return (
        keys1.length === keys2.length &&
        keys1.every((k) => k in key2 && Utils.equals((key1 as any)[k], (key2 as any)[k]))
      );
    }

    if (Array.isArray(key1)) {
      if (!Array.isArray(key2) || key1.length !== key2.length) return false;
      for (let i = 0; i < key1.length; i++) {
        if (!Utils.equals(key1[i], key2[i])) return false;
      }
      return true;
    }
    return false;
  }
}
