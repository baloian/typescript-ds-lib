export class HashTableUtils {
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

  static hashFunction(str: string): number {
    // DJB2a (variant using xor rather than +) hash algorithm.
    // See: http://www.cse.yorku.ca/~oz/hash.html
    let hash = 5381;
    for (const char of str) {
      hash = ((hash << 5) + hash) ^ char.charCodeAt(0);
    }
    // Convert the hash to an unsigned 32-bit integer to match C's unsigned long.
    return hash >>> 0;
  }

  static hash<K>(key: K, capacity: number): number {
    if (key && typeof (key as any).hashCode === 'function') {
      return (key as any).hashCode();
    }
    if (typeof key === 'number' && Number.isSafeInteger(key)) {
      const knuthConstant = 2654435761;
      return (Math.abs(key * knuthConstant) >>> 0) % capacity;
    }
    const stringKey: string = this.valueToString<K>(key);
    return this.hashFunction(stringKey) % capacity;
  }

  static keysEqual<K>(key1: K, key2: K): boolean {
    if (key1 === key2) return true;
    if (key1 && key2 && typeof (key1 as any).equals === 'function') {
      return (key1 as any).equals(key2);
    }
    if (typeof key1 === 'number' && typeof key2 === 'number' && isNaN(key1) && isNaN(key2)) return true;
    if (typeof key1 !== 'object' && typeof key2 !== 'object') return key1 === key2;
    if (key1 instanceof Date && key2 instanceof Date) {
      // Handle invalid dates
      if (isNaN(key1.getTime()) && isNaN(key2.getTime())) return true;
      return key1.getTime() === key2.getTime();
    }
    if (key1 instanceof RegExp && key2 instanceof RegExp) {
      return key1.toString() === key2.toString();
    }
    if (Array.isArray(key1) && Array.isArray(key2)) {
      return key1.length === key2.length &&
        key1.every((val, idx) => HashTableUtils.keysEqual(val, key2[idx]));
    }
    if (key1 === null && key2 === null) return true;
    if (key1 === undefined && key2 === undefined) return true;
    if (key1 === null || key1 === undefined || key2 === null || key2 === undefined) return false;

    if (typeof key1 === 'object' && typeof key2 === 'object') {
      const keys1 = Object.keys(key1);
      const keys2 = Object.keys(key2);
      return keys1.length === keys2.length &&
        keys1.every(k => k in key2 && HashTableUtils.keysEqual((key1 as any)[k], (key2 as any)[k]));
    }
    return false;
  }
}