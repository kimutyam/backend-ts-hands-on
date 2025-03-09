import type { CustomerId } from 'chx/ex10/domain/customer/customerId.js';
import type { Item } from 'chx/ex10/domain/item/item.js';
import type { Quantity } from 'chx/ex10/domain/item/quantity.js';
import type { ProductId } from 'chx/ex10/domain/product/productId.js';
import type { DomainEvent } from 'chx/ex30/domain/domainEvent.js';

export const CartClearedOnOrder = {
  name: 'CartClearedOnOrder' as const,
} as const;

export type CartClearedOnOrder = DomainEvent<CustomerId, typeof CartClearedOnOrder.name, undefined>;

export const CartItemAdded = {
  name: 'CartItemAdded' as const,
} as const;

export type CartItemAdded = DomainEvent<CustomerId, typeof CartItemAdded.name, { item: Item }>;

export const CartItemRemoved = {
  name: 'CartItemRemoved' as const,
} as const;

export type CartItemRemoved = DomainEvent<
  CustomerId,
  typeof CartItemRemoved.name,
  { productId: ProductId }
>;
export const CartItemQuantityUpdated = {
  name: 'CartItemQuantityUpdated' as const,
} as const;

export type CartItemQuantityUpdated = DomainEvent<
  CustomerId,
  typeof CartItemQuantityUpdated.name,
  {
    productId: ProductId;
    quantity: Quantity;
  }
>;

export type CartEvent =
  | CartClearedOnOrder
  | CartItemAdded
  | CartItemRemoved
  | CartItemQuantityUpdated;
