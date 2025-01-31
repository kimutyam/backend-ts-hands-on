import assert from 'node:assert';
import { Aggregate } from './aggregate.js';
import type { Brand } from './brand.js';
import type { CartItem } from './cartItem.js';
import type { CustomerId } from './customerId.js';
import type { OrderId } from './orderId.js';

const aggregateName = 'Order';

interface OrderNotBranded extends Aggregate<OrderId, typeof aggregateName> {
  readonly customerId: CustomerId;
  readonly items: ReadonlyArray<CartItem>;
}

type Order = OrderNotBranded & Brand<typeof aggregateName>;

const hasDuplicate = ({ items }: Order): boolean => {
  const ids = items.map(({ productId }) => productId);
  return new Set(ids).size !== ids.length;
};

const assertOrder = (order: Order): void => {
  assert(!hasDuplicate(order), `重複する商品があります`);
};

const build = (
  aggregateId: OrderId,
  sequenceNumber: number,
  customerId: CustomerId,
  items: ReadonlyArray<CartItem>,
): Order => {
  const notBranded: OrderNotBranded = {
    aggregateId,
    aggregateName,
    sequenceNumber,
    customerId,
    items,
  };
  const order = notBranded as Order;
  assertOrder(order);
  return order;
};

const generate = (
  customerId: CustomerId,
  items: ReadonlyArray<CartItem>,
  generateOrderId: () => OrderId,
): Order => build(generateOrderId(), Aggregate.InitialSequenceNumber, customerId, items);

const Order = {
  build,
  generate,
} as const;

export { Order };
