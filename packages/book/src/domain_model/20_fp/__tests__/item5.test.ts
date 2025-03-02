import * as R from 'remeda';
import { Item } from '../item.js';

it('品目の数量をマイナスで追加すると、合計がマイナスに', () => {
  const item = Item.buildSingle({
    name: 'apple',
    price: 100,
  });
  const orderTotal = R.pipe(
    item,
    Item.add(-10),
    Item.total,
  );
  expect(orderTotal).toBe(-900);
});
