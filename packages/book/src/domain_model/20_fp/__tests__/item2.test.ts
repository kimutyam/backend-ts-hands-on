import * as R from 'remeda';
import type { Item } from '../item.js';
import { add, calculateTotal } from '../item.js';

it('合計を計算する', () => {
  const item: Item = { product: { name: 'apple', price: 100 }, quantity: 1 };
  const orderTotal = R.pipe(item, add(5), calculateTotal);
  expect(orderTotal).toBe(600);
});
