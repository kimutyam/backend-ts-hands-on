import type { CartItem } from './cartItem';
import type { CustomerId } from './customerId';
import type { DomainEvent } from './domainEvent';
import type { ProductId } from './productId';
import type { Quantity } from './quantity';

const CartClearedOnOrder = {
  name: 'CartClearedOnOrder' as const,
} as const;

type CartClearedOnOrder = DomainEvent<CustomerId, typeof CartClearedOnOrder.name, undefined>;

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
  {
    productId: ProductId;
    quantity: Quantity;
  }
>;

type CartEvent = CartClearedOnOrder | CartItemAdded | CartItemRemoved | CartItemQuantityUpdated;

export {
  type CartEvent,
  CartClearedOnOrder,
  CartItemAdded,
  CartItemRemoved,
  CartItemQuantityUpdated,
};
