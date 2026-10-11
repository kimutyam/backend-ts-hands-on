import type { ResultAsync } from 'neverthrow';

import type {
  CartItemAdded,
  CartItemUpdated,
} from '#/app/domain/cart/cartEvent.js';
import type { CartInvariantViolationError } from '#/app/domain/cart/cartInvariantViolationError.js';
import type {
  Quantity,
  QuantityInvariantViolationError,
} from '#/app/domain/cart/quantity.js';
import type { CustomerId } from '#/app/domain/customer/customerId.js';
import type { ProductId } from '#/app/domain/product/productId.js';
import type { ProductNotFoundError } from '#/app/domain/product/productNotFoundError.js';

type AddCartItem = (
  customerId: CustomerId,
  productId: ProductId,
  quantity: Quantity,
) => ResultAsync<
  CartItemAdded | CartItemUpdated,
  | ProductNotFoundError
  | QuantityInvariantViolationError
  | CartInvariantViolationError
>;

const AddCartItem = {
  token: 'AddCartItem',
} as const;

export { AddCartItem };
