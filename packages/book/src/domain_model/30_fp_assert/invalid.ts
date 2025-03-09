import assert from 'assert';
import { Item } from 'domain_model/30_fp_assert/item.js';
import type { Quantity } from 'domain_model/30_fp_assert/quantity.js';
import * as R from 'remeda';

const item = Item.build({ name: 'apple', price: 100 }, 10);
const orderTotal = R.pipe(item, Item.add(-10), Item.total);
// -1000になる。おかしい
console.log(orderTotal);

export const NegativeQuantity = (value: number): Quantity => {
  assert(value < 0);
  return value;
};
