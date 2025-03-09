import assert from 'node:assert';
import { productSchema } from '6_domain_model/branded_type/23_zod_schema/schema.js';
import { z } from 'zod';

describe('parse', () => {
  it('成功', () => {
    const product = productSchema.parse({
      name: 'Apple',
      price: 1000,
    });
    expect(product).toStrictEqual({
      name: 'Apple',
      price: 1000,
    });
  });

  it('エラー: priceが文字列', () => {
    expect(() =>
      productSchema.parse({
        name: 'Apple',
        price: 'Priceless',
      }),
    ).toThrow(z.ZodError);
  });
});

describe('safeParse', () => {
  it('成功', () => {
    const result = productSchema.safeParse({
      name: 'Apple',
      price: 1000,
    });
    assert(result.success);
    expect(result.data).toStrictEqual({
      name: 'Apple',
      price: 1000,
    });
  });

  it('エラー: priceが文字列', () => {
    const result = productSchema.safeParse({
      name: 'Apple',
      price: 'Priceless',
    });
    assert(!result.success);
    const formattedError = result.error.format();
    expect(formattedError).toEqual(
      expect.objectContaining({
        _errors: [],
        price: expect.objectContaining({
          _errors: expect.arrayContaining([
            'Expected number, received string',
          ]),
        }),
      }),
    );
  });
});
