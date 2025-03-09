import type { Item } from 'domain_model/20_fp/item.js';
import { add, calculateTotal } from 'domain_model/20_fp/item.js';
import * as R from 'remeda';

it('合計を計算する', () => {
  const item: Item = {
    product: { name: 'apple', price: 100 },
    quantity: 1,
  };
  const orderTotal = R.pipe(item, add(5), calculateTotal);
  expect(orderTotal).toBe(600);
});
