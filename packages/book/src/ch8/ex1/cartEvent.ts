import type { Cart } from 'ch8/ex1/cart.js';
import type { CartClearReason } from 'ch8/ex1/cartClearReason.js';
import type { CartItem } from 'ch8/ex1/cartItem.js';
import type { CustomerId } from 'ch8/ex1/customerId.js';
import type { DomainEvent } from 'ch8/ex1/domainEvent.js';
import type { ProductId } from 'ch8/ex1/productId.js';

const CartItemAdded = {
  eventName: 'CartItemAdded' as const,
} as const;

type CartItemAdded = DomainEvent<
  CustomerId,
  typeof Cart.name,
  typeof CartItemAdded.eventName,
  { cartItem: CartItem }
>;

const CartItemUpdated = {
  eventName: 'CartItemUpdated' as const,
} as const;

type CartItemUpdated = DomainEvent<
  CustomerId,
  typeof Cart.name,
  typeof CartItemUpdated.eventName,
  { cartItem: CartItem }
>;

const CartItemRemoved = {
  eventName: 'CartItemRemoved' as const,
} as const;

type CartItemRemoved = DomainEvent<
  CustomerId,
  typeof Cart.name,
  typeof CartItemRemoved.eventName,
  { productId: ProductId }
>;

const CartCleared = {
  eventName: 'CartCleared' as const,
} as const;

type CartCleared = DomainEvent<
  CustomerId,
  typeof Cart.name,
  typeof CartCleared.eventName,
  { aggregateId: CustomerId; reason: CartClearReason }
>;

type CartEvent = CartItemAdded | CartItemUpdated | CartItemRemoved | CartCleared;

export { type CartEvent, CartItemAdded, CartItemUpdated, CartItemRemoved, CartCleared };
