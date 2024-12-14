export class HashTableUtils {
  private static valueToString<V>(value: V): string {
    let stringKey: string;
    switch (typeof value) {
      case 'number':
        stringKey = value.toString();
        break;
      case 'object':
        if (value === null) {
          stringKey = 'null';
        } else if (typeof (value as any).toString === 'function') {
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
      case 'undefined':
        stringKey = 'null';
        break;
      default:
        stringKey = String(value);
    }
    return stringKey;
  }

  static hash<K>(key: K, capacity: number): number {
    if (typeof (key as any).hashCode === 'function') {
      return (key as any).hashCode();
    }
    if (typeof key === 'number' && Number.isSafeInteger(key)) {
      const knuthConstant = 2654435761;
      return (Math.abs(key * knuthConstant) >>> 0) % capacity;
    }
    const stringKey: string = this.valueToString<K>(key);
    let hash = 0;
    // DJB2 hash algorithm
    for (let i = 0; i < stringKey.length; i++) {
      hash = ((hash << 5) + hash) + stringKey.charCodeAt(i);
      hash = hash >>> 0; // Convert to 32-bit unsigned integer
    }
    return hash % capacity;
  }

  static keysEqual<K>(key1: K, key2: K): boolean {
    // Check if keys have equals method and use it for comparison
    if (typeof (key1 as any).equals === 'function') {
      return (key1 as any).equals(key2);
    }
    if (key1 === key2) return true;
    if (key1 == null || key2 == null) return false;

    if (typeof key1 !== 'object' && typeof key2 !== 'object') {
      return key1 === key2;
    }
    if (key1 instanceof Date && key2 instanceof Date) {
      return key1.getTime() === key2.getTime();
    }
    if (key1 instanceof RegExp && key2 instanceof RegExp) {
      return key1.toString() === key2.toString();
    }
    if (Array.isArray(key1) && Array.isArray(key2)) {
      return key1.length === key2.length &&
        key1.every((val, idx) => HashTableUtils.keysEqual(val, key2[idx]));
    }
    if (typeof key1 === 'object' && typeof key2 === 'object') {
      const keys1 = Object.keys(key1);
      const keys2 = Object.keys(key2);
      return keys1.length === keys2.length &&
        keys1.every(k => k in key2 && HashTableUtils.keysEqual((key1 as any)[k], (key2 as any)[k]));
    }
    return false;
  }
}
