import { Item } from 'domain_model/20_fp/item.js';
import * as R from 'remeda';

it('合計を計算する', () => {
  const item = Item.buildSingle({
    name: 'apple',
    price: 100,
  });
  const orderTotal = R.pipe(item, Item.add(5), Item.total);
  expect(orderTotal).toBe(600);
});
