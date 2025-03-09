import type { CartItem } from '8_domain_event/1/cartItem.js';
import type { CustomerId } from '8_domain_event/1/customerId.js';
import type { DomainEvent } from '8_domain_event/1/domainEvent.js';
import type { Order } from '8_domain_event/1/order.js';
import type { OrderId } from '8_domain_event/1/orderId.js';

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
