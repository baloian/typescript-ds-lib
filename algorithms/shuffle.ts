import cryptoNode from 'crypto';

/*
* Fisher-Yates shuffle algorithm, Durstenfeld's variant as described in
* https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
*
* This function shuffles the given array in-place.
*/
export function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = cryptoNode.randomInt(0, i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
}
