import * as R from 'remeda';
import { OrderItem } from '../orderItem';

it('合計を計算する', () => {
  const orderItem = OrderItem.buildSingle({ name: 'apple', price: 100 });
  const orderTotal = R.pipe(orderItem, OrderItem.add(5), OrderItem.total);
  expect(orderTotal).toBe(5_000);
});
