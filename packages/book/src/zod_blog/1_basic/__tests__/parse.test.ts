import assert from 'node:assert';
import { z } from 'zod';
import { orderItemSchema } from '../schema.js';

describe('parse', () => {
  it('成功', () => {
    const orderItem = orderItemSchema.parse({
      product: {
        id: 'ABC',
        price: 1000,
      },
      quantity: 10,
    });
    expect(orderItem).toStrictEqual({
      product: {
        id: 'ABC',
        price: 1000,
      },
      quantity: 10,
    });
  });

  it('エラー: quantityが文字列', () => {
    expect(() =>
      orderItemSchema.parse({
        product: {
          id: 'ABC',
          price: 1000,
        },
        quantity: '1個',
      }),
    ).toThrow(z.ZodError);
  });
});

describe('safeParse', () => {
  it('成功', () => {
    const result = orderItemSchema.safeParse({
      product: {
        id: 'ABC',
        price: 1000,
      },
      quantity: 10,
    });
    assert(result.success);
    expect(result.data).toStrictEqual({
      product: {
        id: 'ABC',
        price: 1000,
      },
      quantity: 10,
    });
  });

  it('エラー: priceとquantityが文字列', () => {
    const result = orderItemSchema.safeParse({
      product: {
        id: 'ABC',
        price: 'Priceless',
      },
      quantity: '1個',
    });
    assert(!result.success);
    const formattedError = result.error.format();
    console.log(formattedError);
    expect(formattedError).toEqual(
      expect.objectContaining({
        _errors: [],
        product: expect.objectContaining({
          price: expect.objectContaining({
            _errors: expect.arrayContaining([
              'Expected number, received string',
            ]),
          }),
        }),
        quantity: expect.objectContaining({
          _errors: expect.arrayContaining([
            'Expected number, received string',
          ]),
        }),
      }),
    );
  });
});
