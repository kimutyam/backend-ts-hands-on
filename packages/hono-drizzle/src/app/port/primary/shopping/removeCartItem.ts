import type { ResultAsync } from 'neverthrow';

import type { CartItemRemoved } from '../../../domain/cart/cartEvent.js';
import type { CartItemNotFoundError } from '../../../domain/cart/cartItemNotFoundError.js';
import type { CartNotFoundError } from '../../../domain/cart/cartNotFoundError.js';
import type { CustomerId } from '../../../domain/customer/customerId.js';
import type { ProductId } from '../../../domain/product/productId.js';

type RemoveCartItem = (
  customerId: CustomerId,
  productId: ProductId,
) => ResultAsync<CartItemRemoved, CartNotFoundError | CartItemNotFoundError>;

const RemoveCartItem = {
  token: 'RemoveCartItem',
} as const;

export { RemoveCartItem };
