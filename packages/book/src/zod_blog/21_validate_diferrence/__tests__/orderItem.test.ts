import assert from 'node:assert';
import * as R from 'remeda';
import type { OrderItem } from 'zod_blog/16_domain_zod_neverthrow/orderItem.js';
import { Price } from 'zod_blog/16_domain_zod_neverthrow/product/price.js';
import { OrderQuantityDto } from 'zod_blog/21_validate_diferrence/dto.js';

it('構造の異なる入力値から注文項目を組み立てる', () => {
  const data: unknown = {
    id: '8456C9A7-5135-4067-913A-378ED93A1DAC',
    quantity: 1,
  };
  const result = OrderQuantityDto.schema.safeParse(data);
  assert(result.success);

  const orderItem: OrderItem = R.pipe(
    result.data,
    OrderQuantityDto.toOrderItem(Price.build(100)),
  );
  expect(orderItem.product.id).toBe(
    '8456C9A7-5135-4067-913A-378ED93A1DAC',
  );
  expect(orderItem.product.price).toBe(1_00);
  expect(orderItem.quantity).toBe(1);
});
