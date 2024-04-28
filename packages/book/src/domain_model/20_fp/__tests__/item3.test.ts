import * as R from 'remeda';
import type { Item } from '../item';
import { add, calculateTotal, buildSingle } from '../item';

it('合計を計算する', () => {
  const item: Item = buildSingle({ name: 'apple', price: 100 });
  const orderTotal = R.pipe(item, add(5), calculateTotal);
  expect(orderTotal).toBe(600);
});
