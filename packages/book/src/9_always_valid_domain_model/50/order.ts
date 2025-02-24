import { z } from 'zod';
import { Aggregate } from './aggregate.js';
import { CartItem } from './cartItem.js';
import { CustomerId } from './customerId.js';
import { OrderId } from './orderId.js';

const name = 'Order';

const schema = Aggregate.makeBrandedSchema(
  OrderId.schema,
  z.object({
    customerId: CustomerId.schema,
    items: z.array(CartItem.schema).readonly(),
  }),
  name,
);

type Input = z.input<typeof schema>;
type Order = z.infer<typeof schema>;

const build = (value: Input): Order => schema.parse(value);

const generate = (
  customerId: CustomerId,
  items: ReadonlyArray<CartItem>,
  generateOrderId: () => OrderId,
): Order =>
  build({
    aggregateId: generateOrderId(),
    sequenceNumber: Aggregate.InitialSequenceNumber,
    customerId,
    items,
  });

const Order = {
  name,
  build,
  generate,
} as const;

export { Order };
