import assert from 'node:assert';

function isBinaryNumber(s: string) {
  return /^[01]+$/.test(s);
}

export class BinaryNumber {
  constructor(public value: string) {
    assert(isBinaryNumber(value));
  }

  add(n: number): BinaryNumber {
    throw new Error(`未実装。value:${n}`);
  }

  static toBinaryNumber(n: number): BinaryNumber {
    const bn = n.toString(2);
    return new BinaryNumber(bn);
  }
}

const numbers = [10, 15, 100];
const element = numbers[3];
if (element === undefined) {
  console.log('インデックスに値が存在しませんでした');
} else {
  BinaryNumber.toBinaryNumber(element);
}
