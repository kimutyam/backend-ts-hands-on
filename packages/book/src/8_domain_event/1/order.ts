import { Aggregate } from '8_domain_event/1/aggregate.js';
import type { Brand } from '8_domain_event/1/brand.js';
import type { CartItem } from '8_domain_event/1/cartItem.js';
import type { CustomerId } from '8_domain_event/1/customerId.js';
import type { OrderId } from '8_domain_event/1/orderId.js';

const name = 'Order';

interface OrderNotBranded extends Aggregate<OrderId> {
  readonly customerId: CustomerId;
  readonly items: ReadonlyArray<CartItem>;
}

type Order = OrderNotBranded & Brand<typeof name>;

const build = (
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
  build(
    generateOrderId(),
    Aggregate.InitialSequenceNumber,
    customerId,
    items,
  );

const Order = {
  name,
  build,
  generate,
} as const;

export { Order };
