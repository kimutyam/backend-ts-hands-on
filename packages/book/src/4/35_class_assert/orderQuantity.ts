import assert from 'assert';

export class OrderQuantity {
  constructor(public value: number) {
    assert(Number.isInteger(value), '整数で指定ください');
    assert(value >= 1, '1個以上にしてください');
    assert(value <= 10, '1つの注文に含められるのは10個までです');
  }
}
