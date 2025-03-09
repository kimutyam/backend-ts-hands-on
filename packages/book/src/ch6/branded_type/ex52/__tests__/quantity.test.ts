import assert from 'node:assert';

import { Quantity } from 'ch6/branded_type/ex52/quantity.js';

it('制約違反の場合は、カスタムエラー', () => {
  const result = Quantity.safeBuild(100);
  assert(result.isErr());
  expect(result.error.descriptions).toEqual(
    expect.arrayContaining(['Number must be less than or equal to 10']),
  );
});
