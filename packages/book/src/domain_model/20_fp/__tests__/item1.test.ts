import type { Item } from '../item.js';
import { add, calculateTotal } from '../item.js';

it('合計を計算する', () => {
  const item: Item = {
    product: { name: 'apple', price: 100 },
    quantity: 1,
  };

  const addedItem = add(5)(item);
  const orderTotal = calculateTotal(addedItem);
  expect(orderTotal).toBe(600);
});
