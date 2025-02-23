import { z } from 'zod';
import { Aggregate } from './aggregate.js';
import { CartItem } from './cartItem.js';
import { CustomerId } from './customerId.js';
import { OrderId } from './orderId.js';

const aggregateName = 'Order';

const schema = Aggregate.makeBrandedSchema(
  OrderId.schema,
  z.object({
    customerId: CustomerId.schema,
    items: z.array(CartItem.schema).readonly(),
  }),
  aggregateName,
);

type Input = Omit<z.input<typeof schema>, 'aggregateName'>;
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
  aggregateName,
  build,
  generate,
} as const;

export { Order };
