import * as R from 'remeda';
import { Item } from '../item.js';

it('合計を計算する', () => {
  const item: Item = { product: { name: 'apple', price: 100 }, quantity: 1 };
  const orderTotal = R.pipe(item, Item.add(5), Item.total);
  expect(orderTotal).toBe(600);
});
