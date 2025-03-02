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
    const formattedError = result.error.format();
    expect(formattedError).toEqual(
      expect.objectContaining({
        _errors: [],
        product: expect.objectContaining({
          id: expect.objectContaining({
            _errors: expect.arrayContaining([
              'Invalid uuid',
            ]),
          }),
          price: expect.objectContaining({
            _errors: expect.arrayContaining([
              'Number must be greater than or equal to 1000',
            ]),
          }),
        }),
        quantity: expect.objectContaining({
          _errors: expect.arrayContaining([
            'Number must be less than or equal to 10',
          ]),
        }),
      }),
    );
  });
});
