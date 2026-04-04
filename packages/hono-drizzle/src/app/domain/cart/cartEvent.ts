import type { Cart } from '#/app/domain/cart/cart.js';
import type { CartClearReason } from '#/app/domain/cart/cartClearReason.js';
import type { CartItem } from '#/app/domain/cart/cartItem.js';
import type { CustomerId } from '#/app/domain/customer/customerId.js';
import type { DomainEvent } from '#/app/domain/domainEvent.js';
import type { ProductId } from '#/app/domain/product/productId.js';

const CartItemAdded = {
  eventName: 'CartItemAdded' as const,
} as const;

type CartItemAdded = DomainEvent<
  CustomerId,
  typeof Cart.aggregateName,
  typeof CartItemAdded.eventName,
  { cartItem: CartItem }
>;

const CartItemUpdated = {
  eventName: 'CartItemUpdated' as const,
} as const;

type CartItemUpdated = DomainEvent<
  CustomerId,
  typeof Cart.aggregateName,
  typeof CartItemUpdated.eventName,
  { cartItem: CartItem }
>;

const CartItemRemoved = {
  eventName: 'CartItemRemoved' as const,
} as const;

type CartItemRemoved = DomainEvent<
  CustomerId,
  typeof Cart.aggregateName,
  typeof CartItemRemoved.eventName,
  { productId: ProductId }
>;

const CartCleared = {
  eventName: 'CartCleared' as const,
} as const;

type CartCleared = DomainEvent<
  CustomerId,
  typeof Cart.aggregateName,
  typeof CartCleared.eventName,
  { aggregateId: CustomerId; reason: CartClearReason }
>;

type CartEvent =
  | CartItemAdded
  | CartItemUpdated
  | CartItemRemoved
  | CartCleared;

export {
  CartCleared,
  type CartEvent,
  CartItemAdded,
  CartItemRemoved,
  CartItemUpdated,
};
