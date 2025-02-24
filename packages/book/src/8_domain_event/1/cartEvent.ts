import type { Cart } from './cart.js';
import type { CartClearReason } from './cartClearReason.js';
import type { CartItem } from './cartItem.js';
import type { CustomerId } from './customerId.js';
import type { DomainEvent } from './domainEvent.js';
import type { ProductId } from './productId.js';

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
