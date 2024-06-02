import assert from 'assert';
import * as R from 'remeda';
import { Item } from './item';
import type { Quantity } from './quantity';

const item = Item.build({ name: 'apple', price: 100 }, 10);
const orderTotal = R.pipe(item, Item.add(-10), Item.total);
// -1000になる。おかしい
console.log(orderTotal);

export const NegativeQuantity = (value: number): Quantity => {
  assert(value < 0);
  return value;
};
