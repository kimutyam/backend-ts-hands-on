import assert from 'node:assert';

function isBinaryNumber(s: string) {
  return /^[01]+$/.test(s);
}

function elementToBinaryNumber(arr: Array<number>, index: number): string {
  const element = arr[index];
  // 事前条件
  assert(element !== undefined, '配列範囲内のアクセスをしてください');
  const binaryNumber = element.toString(2);
  // 事後条件
  assert(isBinaryNumber(binaryNumber), '2進数に変換されていません');
  return binaryNumber;
}

elementToBinaryNumber([194, 1, 100], 0);
