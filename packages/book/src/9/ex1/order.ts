import { Aggregate } from './aggregate.js';
import type { Brand } from './brand.js';
import type { CartItem } from './cartItem.js';
import type { CustomerId } from './customerId.js';
import type { OrderId } from './orderId.js';

const aggregateName = 'Order';

interface OrderNotBranded extends Aggregate<OrderId> {
  readonly customerId: CustomerId;
  readonly items: ReadonlyArray<CartItem>;
}

type Order = OrderNotBranded & Brand<typeof aggregateName>;

const create = (
  aggregateId: OrderId,
  sequenceNumber: number,
  customerId: CustomerId,
  items: ReadonlyArray<CartItem>,
): Order => {
  const notBranded: OrderNotBranded = {
    aggregateId,
    sequenceNumber,
    customerId,
    items,
  };
  return notBranded as Order;
};

const generate = (
  customerId: CustomerId,
  items: ReadonlyArray<CartItem>,
  generateOrderId: () => OrderId,
): Order =>
  create(generateOrderId(), Aggregate.InitialSequenceNumber, customerId, items);

const Order = {
  aggregateName,
  create,
  generate,
} as const;

export { Order };
