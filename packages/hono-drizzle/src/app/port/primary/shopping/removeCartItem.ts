import type { ResultAsync } from 'neverthrow';

import type { CartItemRemoved } from '#/app/domain/cart/cartEvent.js';
import type { CartItemNotFoundError } from '#/app/domain/cart/cartItemNotFoundError.js';
import type { CartNotFoundError } from '#/app/domain/cart/cartNotFoundError.js';
import type { CustomerId } from '#/app/domain/customer/customerId.js';
import type { ProductId } from '#/app/domain/product/productId.js';

type RemoveCartItem = (
  customerId: CustomerId,
  productId: ProductId,
) => ResultAsync<CartItemRemoved, CartNotFoundError | CartItemNotFoundError>;

const RemoveCartItem = {
  token: 'RemoveCartItem',
} as const;

export { RemoveCartItem };
