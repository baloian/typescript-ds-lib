export class HashUtils {
  private static valueToString<V>(value: V): string {
    if (value === null || value === undefined) return 'null';
    let stringKey: string;
    switch (typeof value) {
      case 'number':
        stringKey = value.toString();
        break;
      case 'object':
        if (typeof (value as any).toString === 'function') {
          stringKey = (value as any).toString();
        } else {
          stringKey = JSON.stringify(value);
        }
        break;
      case 'string':
        stringKey = value;
        break;
      case 'function':
        stringKey = value.toString();
        break;
      case 'symbol':
        stringKey = value.toString();
        break;
      default:
        stringKey = String(value);
    }
    return stringKey;
  }

  // Thomas Wang, Integer Hash Functions.
  static wangHash32(key: number): number {
    key = key >>> 0;
    key = ~key + (key << 15);
    key = key ^ (key >>> 12);
    key = key + (key << 2);
    key = key ^ (key >>> 4);
    // Ensure multiplication wraps to 32 bits
    key = ((key << 11) + (key << 3) + key) >>> 0;
    key = key ^ (key >>> 16);
    return key >>> 0;
  }

  /*
   * DJB2a (variant using xor rather than +) hash algorithm.
   * See: http://www.cse.yorku.ca/~oz/hash.html
   */
  static djb2aHash(str: string): number {
    let hash: number = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    }
    // Convert the hash to an unsigned 32-bit integer to match C's unsigned long.
    return hash >>> 0;
  }

  static hash<K>(key: K, capacity: number): number {
    if (key && typeof (key as any).hashCode === 'function') {
      return (key as any).hashCode();
    }
    if (typeof key === 'number' && Number.isSafeInteger(key)) {
      return HashUtils.wangHash32(key) % capacity;
    }
    const stringKey: string = this.valueToString<K>(key);
    return HashUtils.djb2aHash(stringKey) % capacity;
  }

  static equals<K>(key1: K, key2: K): boolean {
    if (key1 === key2) return true;
    if (key1 == null || key2 == null) return key1 === key2;

    // Check for custom equals method
    if (typeof (key1 as any).equals === 'function') {
      return (key1 as any).equals(key2);
    }

    const type1 = typeof key1;
    const type2 = typeof key2;

    // Handle primitives
    if (type1 !== 'object' && type2 !== 'object') {
      if (type1 === 'number' && type2 === 'number') {
        return key1 === key2 || (isNaN(key1 as number) && isNaN(key2 as number));
      }
      return key1 === key2;
    }

    // Handle special object types
    if (key1 instanceof Date) {
      return key2 instanceof Date &&
        (key1.getTime() === key2.getTime() || (isNaN(key1.getTime()) && isNaN(key2.getTime())));
    }

    if (key1 instanceof RegExp) {
      return key2 instanceof RegExp && key1.toString() === key2.toString();
    }

    if (Array.isArray(key1)) {
      if (!Array.isArray(key2) || key1.length !== key2.length) return false;
      for (let i = 0; i < key1.length; i++) {
        if (!HashUtils.equals(key1[i], key2[i])) return false;
      }
      return true;
    }

    // Handle plain objects
    if (typeof key1 === 'object' && typeof key2 === 'object') {
      const keys1 = Object.keys(key1);
      const keys2 = Object.keys(key2);
      return keys1.length === keys2.length &&
        keys1.every(k => k in key2 && HashUtils.equals((key1 as any)[k], (key2 as any)[k]));
    }
    return false;
  }
}
