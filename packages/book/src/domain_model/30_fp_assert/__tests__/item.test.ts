import { Item } from 'domain_model/30_fp_assert/item.js';
import * as R from 'remeda';

it.skip('aa', () => {
  const item = Item.build({ name: 'apple', price: 100 }, 3);
  const orderTotal = R.pipe(item, Item.add(-10), Item.total);
  expect(orderTotal).toBe(-1_000);
});
