import { z } from 'zod';

import { Aggregate } from '../aggregate.js';
import { CartItem } from '../cart/cartItem.js';
import { CustomerId } from '../customer/customerId.js';
import { OrderId } from './orderId.js';

const aggregateName = 'Order';

const schema = Aggregate.makeBrandedSchema(
  OrderId.schema,
  z.object({
    customerId: CustomerId.schema,
    items: z.array(CartItem.schema).readonly(),
  }).shape,
  aggregateName,
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
