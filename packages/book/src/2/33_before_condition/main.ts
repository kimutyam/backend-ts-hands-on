import assert from 'node:assert';

function elementToBinaryNumber(arr: Array<number>, index: number): string {
  const element = arr[index];
  assert(element !== undefined, '配列範囲内のアクセスをしてください');
  return element.toString(2);
}

elementToBinaryNumber([194, 1, 100], 3);
