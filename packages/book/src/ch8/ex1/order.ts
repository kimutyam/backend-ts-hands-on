import { Aggregate } from 'ch8/ex1/aggregate.js';
import type { Brand } from 'ch8/ex1/brand.js';
import type { CartItem } from 'ch8/ex1/cartItem.js';
import type { CustomerId } from 'ch8/ex1/customerId.js';
import type { OrderId } from 'ch8/ex1/orderId.js';

const name = 'Order';

interface OrderNotBranded extends Aggregate<OrderId> {
  readonly customerId: CustomerId;
  readonly items: ReadonlyArray<CartItem>;
}

type Order = OrderNotBranded & Brand<typeof name>;

const valueOf = (
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
  valueOf(
    generateOrderId(),
    Aggregate.InitialSequenceNumber,
    customerId,
    items,
  );

const Order = {
  name,
  valueOf,
  generate,
} as const;

export { Order };
