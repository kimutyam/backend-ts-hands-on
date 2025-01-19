import type { CartItem } from './cartItem';
import type { CustomerId } from './customerId';
import type { DomainEvent } from './domainEvent';
import type { ProductId } from './productId';

const CartCleared = {
  name: 'CartCleared' as const,
} as const;

type CartCleared = DomainEvent<CustomerId, typeof CartCleared.name, { aggregateId: CustomerId }>;

const CartItemAdded = {
  name: 'CartItemAdded' as const,
} as const;

type CartItemAdded = DomainEvent<CustomerId, typeof CartItemAdded.name, { cartItem: CartItem }>;

const CartItemRemoved = {
  name: 'CartItemRemoved' as const,
} as const;

type CartItemRemoved = DomainEvent<
  CustomerId,
  typeof CartItemRemoved.name,
  { productId: ProductId }
>;
const CartItemQuantityUpdated = {
  name: 'CartItemQuantityUpdated' as const,
} as const;

type CartItemQuantityUpdated = DomainEvent<
  CustomerId,
  typeof CartItemQuantityUpdated.name,
  { cartItem: CartItem }
>;

type CartEvent = CartCleared | CartItemAdded | CartItemRemoved | CartItemQuantityUpdated;

export { type CartEvent, CartCleared, CartItemAdded, CartItemRemoved, CartItemQuantityUpdated };
