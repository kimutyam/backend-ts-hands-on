import { Aggregate } from 'ch9/ex50/aggregate.js';
import { CartItem } from 'ch9/ex50/cartItem.js';
import { CustomerId } from 'ch9/ex50/customerId.js';
import { OrderId } from 'ch9/ex50/orderId.js';
import { z } from 'zod';

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
