import * as R from 'remeda';
import { z } from 'zod';

import { Aggregate } from '#/app/domain/aggregate.js';
import { CartItem } from '#/app/domain/cart/cartItem.js';
import { CustomerId } from '#/app/domain/customer/customerId.js';
import { DomainEvent } from '#/app/domain/domainEvent.js';
import { OrderRequested } from '#/app/domain/order/orderEvent.js';
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

const request = (aggregate: Order): [Order, OrderRequested] => {
  const orderRequested = R.pipe(
    parse({
      ...aggregate,
      sequenceNumber: Aggregate.incrementSequenceNumber(
        aggregate.sequenceNumber,
      ),
    }),
    DomainEvent.generate(Order.aggregateName, OrderRequested.eventName, {
      customerId: aggregate.customerId,
      items: aggregate.items,
    }),
  );
  return [aggregate, orderRequested];
};

const Order = {
  aggregateName,
  parse,
  generate,
  request,
} as const;

export { Order };
