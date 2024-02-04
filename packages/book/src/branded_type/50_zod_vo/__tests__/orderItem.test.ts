import assert from 'node:assert';
import * as R from 'remeda';
import { z } from 'zod';
import { OrderItem } from '../orderItem';
import { OrderQuantity } from '../orderQuantity';
import { Name } from '../product/name';
import { Price } from '../product/price';

it('注文項目をパースする', () => {
  const productSchema = z.object({
    name: Name.schema,
    price: Price.schema,
  });

  const orderItemSchema = z.object({
    quantity: OrderQuantity.schema,
    product: productSchema,
  });

  const result = orderItemSchema.safeParse({
    product: {
      name: 'apple',
      price: 1_000,
    },
    quantity: 3,
  });
  assert(result.success);

  const total = R.pipe(result.data, OrderItem.total);
  expect(total).toBe(3_000);
});

it('構造の異なる入力値から注文項目を組み立てる', () => {
  // 値オブジェクトの制約よりも強い入力制限をするユースケースを想定
  const orderQuantityDtoSchema = z.number().int().min(1).max(2);

  type OrderQuantityDto = z.infer<typeof orderQuantityDtoSchema>;

  // 注文項目の構造とは異なる入力値を想定
  type Dto = Readonly<{
    name: Name;
    quantity: OrderQuantityDto;
  }>;

  const orderItemSchema = z.object({
    quantity: orderQuantityDtoSchema,
    name: Name.schema,
  });

  const result = orderItemSchema.safeParse({
    name: 'apple',
    quantity: 1,
  });
  assert(result.success);

  const convertToOrderItem =
    (price: Price) =>
    ({ name, quantity }: Dto): OrderItem => ({
      product: {
        name,
        price,
      },
      quantity: OrderQuantity.build(quantity), // 値オブジェクトの制約を満たすことが自明であるため、safeBuildでなくて、buildを利用
    });

  // 内部で価格を決定することを想定
  const price = Price.build(100);
  const total = R.pipe(result.data, convertToOrderItem(price), OrderItem.total);
  expect(total).toBe(100);
});

it('注文項目の構成要素の不変条件違反を検出してエラーにする', () => {
  const productSchema = z.object({
    name: Name.schema,
    price: Price.schema,
  });

  const orderItemSchema = z.object({
    quantity: OrderQuantity.schema,
    product: productSchema,
  });

  const result = orderItemSchema.safeParse({
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
