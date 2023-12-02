import type { OrderItem } from '../orderItem';
import { add, calculateTotal } from '../orderItem';

it('合計を計算する', () => {
  const orderItem: OrderItem = { product: { name: 'apple', price: 100 }, quantity: 1 };

  const addedOrderItem = add(5)(orderItem);
  const orderTotal = calculateTotal(addedOrderItem);
  expect(orderTotal).toBe(5_000);
});
