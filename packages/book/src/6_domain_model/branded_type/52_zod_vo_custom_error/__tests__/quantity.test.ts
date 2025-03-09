import assert from 'node:assert';
import { Quantity } from '6_domain_model/branded_type/52_zod_vo_custom_error/quantity.js';

it('制約違反の場合は、カスタムエラー', () => {
  const result = Quantity.safeBuild(100);
  assert(result.isErr());
  expect(result.error.descriptions).toEqual(
    expect.arrayContaining([
      'Number must be less than or equal to 10',
    ]),
  );
});
