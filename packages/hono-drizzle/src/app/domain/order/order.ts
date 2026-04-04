import { z } from 'zod';

import { Aggregate } from '#/app/domain/aggregate.js';
import { CartItem } from '#/app/domain/cart/cartItem.js';
import { CustomerId } from '#/app/domain/customer/customerId.js';
import { OrderId } from '#/app/domain/order/orderId.js';

const aggregateName = 'Order';

const schema = Aggregate.makeBrandedSchema(
  OrderId.schema,
  z.object({
    customerId: CustomerId.schema,
    items: z.array(CartItem.schema).readonly(),
  }),
  aggregateName,
  { id: aggregateName, description: '注文' },
);

type Input = z.input<typeof schema>;
type Order = z.infer<typeof schema>;

const parse = (value: Input): Order => schema.parse(value);

const generate = (
  customerId: CustomerId,
  items: ReadonlyArray<CartItem>,
  generateOrderId: () => OrderId,
): Order =>
  parse({
    aggregateId: generateOrderId(),
    sequenceNumber: Aggregate.InitialSequenceNumber,
    customerId,
    items,
  });

const Order = {
  aggregateName,
  parse,
  generate,
} as const;

export { Order };
