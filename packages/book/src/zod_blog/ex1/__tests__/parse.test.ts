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
    expect(result.error.issues).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'invalid_type',
          path: ['product', 'price'],
        }),
        expect.objectContaining({
          code: 'invalid_type',
          path: ['quantity'],
        }),
      ]),
    );
  });
});
