import assert from 'node:assert';
import { Item } from 'ch6/branded_type/ex50/item.js';
import { Name } from 'ch6/branded_type/ex50/product/name.js';
import { Price } from 'ch6/branded_type/ex50/product/price.js';
import { Quantity } from 'ch6/branded_type/ex50/quantity.js';
import * as R from 'remeda';
import { z } from 'zod';

it('注文項目をパースする', () => {
  const productSchema = z.object({
    name: Name.schema,
    price: Price.schema,
  });

  const itemSchema = z.object({
    quantity: Quantity.schema,
    product: productSchema,
  });

  const result = itemSchema.safeParse({
    product: {
      name: 'apple',
      price: 1_000,
    },
    quantity: 3,
  });
  assert(result.success);

  const total = R.pipe(result.data, Item.total);
  expect(total).toBe(3_000);
});

it('構造の異なる入力値から注文項目を組み立てる', () => {
  // 値オブジェクトの制約よりも強い入力制限をするユースケースを想定
  const quantityDtoSchema = z.number().int().min(1).max(2);

  type QuantityDto = z.infer<typeof quantityDtoSchema>;

  // 注文項目の構造とは異なる入力値を想定
  type Dto = Readonly<{
    name: Name;
    quantity: QuantityDto;
  }>;

  const itemSchema = z.object({
    quantity: quantityDtoSchema,
    name: Name.schema,
  });

  const result = itemSchema.safeParse({
    name: 'apple',
    quantity: 1,
  });
  assert(result.success);

  const convertToItem =
    (price: Price) =>
    ({ name, quantity }: Dto): Item => ({
      product: {
        name,
        price,
      },
      quantity: Quantity.build(quantity), // 値オブジェクトの制約を満たすことが自明であるため、safeBuildでなくて、buildを利用
    });

  // 内部で価格を決定することを想定
  const price = Price.build(100);
  const total = R.pipe(result.data, convertToItem(price), Item.total);
  expect(total).toBe(100);
});

it('注文項目の構成要素の不変条件違反を検出してエラーにする', () => {
  const productSchema = z.object({
    name: Name.schema,
    price: Price.schema,
  });

  const itemSchema = z.object({
    quantity: Quantity.schema,
    product: productSchema,
  });

  const result = itemSchema.safeParse({
    product: {
      name: 'apple',
      price: 0,
    },
    quantity: 0,
  });
  assert(!result.success);
  expect(result.error.format()).toEqual(
    expect.objectContaining({
      quantity: expect.objectContaining({
        _errors: expect.arrayContaining(['Number must be greater than or equal to 1']),
      }),
      product: expect.objectContaining({
        price: expect.objectContaining({
          _errors: expect.arrayContaining(['Number must be greater than or equal to 100']),
        }),
      }),
    }),
  );
});
