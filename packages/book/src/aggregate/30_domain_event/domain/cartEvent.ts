import type { Item } from '../../10_zod/domain/cart/item';
import type { Quantity } from '../../10_zod/domain/cart/quantity';
import type { CustomerId } from '../../10_zod/domain/customer/customerId';
import type { ProductId } from '../../10_zod/domain/product/productId';
import type { DomainEvent } from './domainEvent';

export const CartCleared = {
  name: 'CartCleared',
};

export type CartCleared = DomainEvent<CustomerId, typeof CartCleared.name>;

export const CartAdded = {
  name: 'CartAdded',
};

export type CartAdded = DomainEvent<CustomerId, typeof CartAdded.name> & {
  item: Item;
};

export const CartRemoved = {
  name: 'CartRemoved',
};

export type CartRemoved = DomainEvent<CustomerId, typeof CartRemoved.name> & {
  productId: ProductId;
};

export const CartQuantityUpdated = {
  name: 'CartQuantityUpdated',
};

export type CartQuantityUpdated = DomainEvent<CustomerId, typeof CartRemoved.name> & {
  productId: ProductId;
  quantity: Quantity;
};

export type CartEvent = CartCleared | CartAdded | CartRemoved | CartQuantityUpdated;
