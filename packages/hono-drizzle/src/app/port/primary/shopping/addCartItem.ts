import type { ResultAsync } from 'neverthrow';

import type {
  CartItemAdded,
  CartItemUpdated,
} from '../../../domain/cart/cartEvent.js';
import type { CartNotFoundError } from '../../../domain/cart/cartNotFoundError.js';
import type { CartRefinementsError } from '../../../domain/cart/cartRefinementsError.js';
import type {
  Quantity,
  QuantityRefinementsError,
} from '../../../domain/cart/quantity.js';
import type { CustomerId } from '../../../domain/customer/customerId.js';
import type { ProductId } from '../../../domain/product/productId.js';
import type { ProductNotFoundError } from '../../../domain/product/productNotFoundError.js';

type AddCartItem = (
  customerId: CustomerId,
  productId: ProductId,
  quantity: Quantity,
) => ResultAsync<
  CartItemAdded | CartItemUpdated,
  | ProductNotFoundError
  | CartNotFoundError
  | QuantityRefinementsError
  | CartRefinementsError
>;

const AddCartItem = {
  token: 'AddCartItem',
} as const;

export { AddCartItem };
