import type { CartItem } from '9_always_valid_domain_model/50/cartItem.js';
import type { CustomerId } from '9_always_valid_domain_model/50/customerId.js';
import type { DomainEvent } from '9_always_valid_domain_model/50/domainEvent.js';
import type { Order } from '9_always_valid_domain_model/50/order.js';
import type { OrderId } from '9_always_valid_domain_model/50/orderId.js';

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
