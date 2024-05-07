import type { CustomerId } from '../../../10_zod/domain/customer/customerId';
import type { Item } from '../../../10_zod/domain/item/item';
import type { Quantity } from '../../../10_zod/domain/item/quantity';
import type { ProductId } from '../../../10_zod/domain/product/productId';
import type { DomainEvent } from '../domainEvent';

export const CartClearedOnOrder = {
  name: 'CartClearedOnOrder',
};

export type CartClearedOnOrder = DomainEvent<CustomerId, typeof CartClearedOnOrder.name, undefined>;

export const CartItemAdded = {
  name: 'CartItemAdded',
};

export type CartItemAdded = DomainEvent<CustomerId, typeof CartItemAdded.name, { item: Item }>;

export const CartItemRemoved = {
  name: 'CartItemRemoved',
};

export type CartItemRemoved = DomainEvent<
  CustomerId,
  typeof CartItemRemoved.name,
  { productId: ProductId }
>;
export const CartItemQuantityUpdated = {
  name: 'CartItemQuantityUpdated',
};

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