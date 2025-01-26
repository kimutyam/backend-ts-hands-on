import type { CartItem } from './cartItem.js';
import type { CustomerId } from './customerId.js';
import type { DomainEvent } from './domainEvent.js';
import type { ProductId } from './productId.js';

const CartCleared = {
  eventName: 'CartCleared' as const,
} as const;

type CartCleared = DomainEvent<
  CustomerId,
  typeof CartCleared.eventName,
  { aggregateId: CustomerId }
>;

const CartItemAdded = {
  eventName: 'CartItemAdded' as const,
} as const;

type CartItemAdded = DomainEvent<
  CustomerId,
  typeof CartItemAdded.eventName,
  { cartItem: CartItem }
>;

const CartItemRemoved = {
  eventName: 'CartItemRemoved' as const,
} as const;

type CartItemRemoved = DomainEvent<
  CustomerId,
  typeof CartItemRemoved.eventName,
  { productId: ProductId }
>;
const CartItemUpdated = {
  eventName: 'CartItemUpdated' as const,
} as const;

type CartItemUpdated = DomainEvent<
  CustomerId,
  typeof CartItemUpdated.eventName,
  { cartItem: CartItem }
>;

type CartEvent = CartCleared | CartItemAdded | CartItemRemoved | CartItemUpdated;

export { type CartEvent, CartCleared, CartItemAdded, CartItemRemoved, CartItemUpdated };
