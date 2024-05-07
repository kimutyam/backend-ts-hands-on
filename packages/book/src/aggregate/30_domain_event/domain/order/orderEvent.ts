import type { CustomerId } from '../../../10_zod/domain/customer/customerId';
import type { Item } from '../../../10_zod/domain/item/item';
import type { OrderId } from '../../../10_zod/domain/order/orderId';
import type { DomainEvent } from '../domainEvent';

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
