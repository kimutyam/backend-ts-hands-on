import assert from 'node:assert';

export class Quantity {
  constructor(public value: number) {
    assert(Number.isInteger(value), '整数で指定ください');
    assert(value >= 1, '1個以上にしてください');
    assert(value <= 10, '10個までしか含められません');
  }
}
