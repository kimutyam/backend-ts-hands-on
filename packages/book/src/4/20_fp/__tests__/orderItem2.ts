import * as R from 'remeda';
import type { OrderItem } from '../orderItem';
import { add, calculateTotal } from '../orderItem';

it('合計を計算する', () => {
  const orderItem: OrderItem = { product: { name: 'apple', price: 100 }, quantity: 1 };
  const orderTotal = R.pipe(orderItem, add(5), calculateTotal);
  expect(orderTotal).toBe(5_000);
});
