import * as R from 'remeda';
import { OrderItem } from '../orderItem';

/** eslint jest/no-disabled-tests: 0 */
it.skip('aa', () => {
  const orderItem = OrderItem.build({ name: 'apple', price: 100 }, 3);
  const orderTotal = R.pipe(orderItem, OrderItem.add(-10), OrderItem.total);
  expect(orderTotal).toBe(-1_000);
});
