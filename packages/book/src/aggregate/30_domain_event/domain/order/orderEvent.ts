import type { CustomerId } from 'aggregate/10_zod/domain/customer/customerId.js';
import type { Item } from 'aggregate/10_zod/domain/item/item.js';
import type { OrderId } from 'aggregate/10_zod/domain/order/orderId.js';
import type { DomainEvent } from 'aggregate/30_domain_event/domain/domainEvent.js';

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
