import * as R from 'remeda';
import { OrderItem } from '../orderItem';

it('4', () => {
  const orderItem = OrderItem.buildSingle({ name: 'apple', price: 100 });
  const orderTotal = R.pipe(orderItem, OrderItem.add(-10), OrderItem.total);
  // おかしい..
  expect(orderTotal).toBe(-1_000);
});
