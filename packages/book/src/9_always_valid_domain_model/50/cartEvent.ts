import type { Cart } from '9_always_valid_domain_model/50/cart.js';
import type { CartClearReason } from '9_always_valid_domain_model/50/cartClearReason.js';
import type { CartItem } from '9_always_valid_domain_model/50/cartItem.js';
import type { CustomerId } from '9_always_valid_domain_model/50/customerId.js';
import type { DomainEvent } from '9_always_valid_domain_model/50/domainEvent.js';
import type { ProductId } from '9_always_valid_domain_model/50/productId.js';

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

type CartEvent =
  | CartItemAdded
  | CartItemUpdated
  | CartItemRemoved
  | CartCleared;

export {
  type CartEvent,
  CartItemAdded,
  CartItemUpdated,
  CartItemRemoved,
  CartCleared,
};
