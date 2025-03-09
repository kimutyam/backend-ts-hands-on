import type { CustomerId } from 'chx/ex10/domain/customer/customerId.js';
import type { Item } from 'chx/ex10/domain/item/item.js';
import type { OrderId } from 'chx/ex10/domain/order/orderId.js';
import type { DomainEvent } from 'chx/ex30/domain/domainEvent.js';

export const OrderRequested = {
  name: 'OrderRequested' as const,
} as const;

export type OrderRequested = DomainEvent<
  OrderId,
  typeof OrderRequested.name,
  {
    customerId: CustomerId;
    items: ReadonlyArray<Item>;
  }
>;

export type OrderItem = OrderRequested;
