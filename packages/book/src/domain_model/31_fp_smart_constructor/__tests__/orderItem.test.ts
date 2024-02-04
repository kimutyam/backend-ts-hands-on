import assert from 'node:assert';
import * as R from 'remeda';
import { OrderItem } from '../orderItem';

it('マイナス値の数量を追加するとエラー', () => {
  const result = R.pipe(
    OrderItem.buildSingle({ name: 'apple', price: 100 }),
    OrderItem.add(-10),
  ).map(OrderItem.total);

  assert(result.isErr());
  expect(result.error.message).toBe('1個以上にしてください');
});

it('マイナス値の数量を追加するとエラー(safeBuild関数を利用)', () => {
  const result = OrderItem.safeBuild({ name: 'apple', price: 100 }, 3).andThen((orderItem) =>
    OrderItem.add(-10)(orderItem).map(OrderItem.total),
  );

  assert(result.isErr());
  expect(result.error.message).toBe('1個以上にしてください');
});
