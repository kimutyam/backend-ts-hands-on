import assert from 'node:assert';
import { OrderItem } from '../../16_domain_zod_neverthrow/orderItem.js';

it('注文項目をパースする', () => {
  const data: unknown = {
    product: {
      id: '8456C9A7-5135-4067-913A-378ED93A1DAC',
      price: 1_000,
    },
    quantity: 3,
  };

  const result = OrderItem.schema.safeParse(data);
  assert(result.success);

  const orderItem: OrderItem = result.data;

  expect(orderItem.product.id).toBe(
    '8456C9A7-5135-4067-913A-378ED93A1DAC',
  );
  expect(orderItem.product.price).toBe(1_000);
  expect(orderItem.quantity).toBe(3);
});
