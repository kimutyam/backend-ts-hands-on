import assert from 'node:assert';
import * as R from 'remeda';
import type { OrderItem } from '../../16_domain_zod_neverthrow/orderItem';
import { Price } from '../../16_domain_zod_neverthrow/product/price';
import { OrderQuantityDto } from '../dto';

it('構造の異なる入力値から注文項目を組み立てる', () => {
  const data: unknown = {
    id: '8456C9A7-5135-4067-913A-378ED93A1DAC',
    quantity: 1,
  };
  const result = OrderQuantityDto.schema.safeParse(data);
  assert(result.success);

  const orderItem: OrderItem = R.pipe(result.data, OrderQuantityDto.toOrderItem(Price.build(100)));
  expect(orderItem.product.id).toBe('8456C9A7-5135-4067-913A-378ED93A1DAC');
  expect(orderItem.product.price).toBe(1_00);
  expect(orderItem.quantity).toBe(1);
});
