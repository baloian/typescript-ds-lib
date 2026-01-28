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
      const hashValue = (key as any).hashCode();
      return typeof hashValue === 'number'
        ? hashValue % capacity
        : HashUtils.djb2aHash(String(hashValue)) % capacity;
    }
    if (typeof key === 'number' && Number.isSafeInteger(key)) {
      return HashUtils.wangHash32(key) % capacity;
    }
    const stringKey: string = this.valueToString<K>(key);
    return HashUtils.djb2aHash(stringKey) % capacity;
  }
}
