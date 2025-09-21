import type { ResultAsync } from 'neverthrow';

import type { AddCartError } from '../../../domain/cart/cartError.js';
import type {
  CartItemAdded,
  CartItemUpdated,
} from '../../../domain/cart/cartEvent.js';
import type { CartNotFoundError } from '../../../domain/cart/cartNotFoundError.js';
import type { Quantity } from '../../../domain/cart/quantity.js';
import type { CustomerId } from '../../../domain/customer/customerId.js';
import type { ProductId } from '../../../domain/product/productId.js';
import type { ProductNotFoundError } from '../../../domain/product/productNotFoundError.js';

type AddCartItem = (
  customerId: CustomerId,
  productId: ProductId,
  quantity: Quantity,
) => ResultAsync<
  CartItemAdded | CartItemUpdated,
  ProductNotFoundError | CartNotFoundError | AddCartError
>;

export type { AddCartItem };
