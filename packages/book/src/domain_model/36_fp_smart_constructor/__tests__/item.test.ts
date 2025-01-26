import assert from 'node:assert';
import * as R from 'remeda';
import { Item } from '../item.js';

it('マイナス値の数量を追加するとエラー', () => {
  const result = R.pipe(Item.buildSingle({ name: 'apple', price: 100 }), Item.add(-10)).map(
    Item.total,
  );

  assert(result.isErr());
  expect(result.error.message).toBe('1個以上にしてください');
});

it('マイナス値の数量を追加するとエラー(safeBuild関数を利用)', () => {
  const result = Item.safeBuild({ name: 'apple', price: 100 }, 3).andThen((item) =>
    Item.add(-10)(item).map(Item.total),
  );

  assert(result.isErr());
  expect(result.error.message).toBe('1個以上にしてください');
});
