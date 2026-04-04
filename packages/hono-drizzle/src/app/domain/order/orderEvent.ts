import type { CartItem } from '#/app/domain/cart/cartItem.js';
import type { CustomerId } from '#/app/domain/customer/customerId.js';
import type { DomainEvent } from '#/app/domain/domainEvent.js';
import type { Order } from '#/app/domain/order/order.js';
import type { OrderId } from '#/app/domain/order/orderId.js';

const OrderRequested = {
  eventName: 'OrderRequested' as const,
} as const;

type OrderRequested = DomainEvent<
  OrderId,
  typeof Order.aggregateName,
  typeof OrderRequested.eventName,
  {
    customerId: CustomerId;
    items: ReadonlyArray<CartItem>;
  }
>;

type OrderEvent = OrderRequested;

export { type OrderEvent, OrderRequested };
