import assert from 'assert';
import * as R from 'remeda';
import { OrderItem } from './orderItem';
import type { OrderQuantity } from './orderQuantity';

const orderItem = OrderItem.build({ name: 'apple', price: 100 }, 10);
const orderTotal = R.pipe(orderItem, OrderItem.add(-10), OrderItem.total);
// -1000になる。おかしい
// eslint-disable-next-line no-console
console.log(orderTotal);

export const NegativeOrderQuantity = (value: number): OrderQuantity => {
  assert(value < 0);
  return value;
};
