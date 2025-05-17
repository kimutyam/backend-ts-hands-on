import type { CartItem } from '../cart/cartItem.js';
import type { CustomerId } from '../customer/customerId.js';
import type { DomainEvent } from '../domainEvent.js';
import type { Order } from './order.js';
import type { OrderId } from './orderId.js';

const OrderRequested = {
  eventName: 'OrderRequested' as const,
} as const;

type OrderRequested = DomainEvent<
  OrderId,
  typeof Order.name,
  typeof OrderRequested.eventName,
  {
    customerId: CustomerId;
    items: ReadonlyArray<CartItem>;
  }
>;

type OrderEvent = OrderRequested;

export { type OrderEvent, OrderRequested };
