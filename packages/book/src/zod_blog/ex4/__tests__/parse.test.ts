import assert from 'node:assert';

import { orderItemSchema } from '../schema.js';

describe('safeParse', () => {
  it('全てのプロパティで制約エラー', () => {
    const result = orderItemSchema.safeParse({
      product: {
        id: 'ABC',
        price: 1,
      },
      quantity: 100,
    });
    assert(!result.success);

    expect(result.error.issues).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'invalid_format',
          path: ['product', 'id'],
        }),
        expect.objectContaining({
          code: 'too_small',
          path: ['product', 'price'],
        }),
        expect.objectContaining({
          code: 'too_big',
          path: ['quantity'],
        }),
      ]),
    );
  });
});
