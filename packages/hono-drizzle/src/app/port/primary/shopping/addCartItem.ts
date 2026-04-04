import type { ResultAsync } from 'neverthrow';

import type {
  CartItemAdded,
  CartItemUpdated,
} from '#/app/domain/cart/cartEvent.js';
import type { CartRefinementsError } from '#/app/domain/cart/cartRefinementsError.js';
import type {
  Quantity,
  QuantityRefinementsError,
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
  ProductNotFoundError | QuantityRefinementsError | CartRefinementsError
>;

const AddCartItem = {
  token: 'AddCartItem',
} as const;

export { AddCartItem };
