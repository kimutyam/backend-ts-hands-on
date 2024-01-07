import * as R from 'remeda';
import type { OrderItem } from '../orderItem';
import { add, calculateTotal, buildSingle } from '../orderItem';

it('合計を計算する', () => {
  const orderItem: OrderItem = buildSingle({ name: 'apple', price: 100 });
  const orderTotal = R.pipe(orderItem, add(5), calculateTotal);
  expect(orderTotal).toBe(5_000);
});
