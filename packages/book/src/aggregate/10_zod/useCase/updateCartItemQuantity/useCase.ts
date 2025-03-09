import type {
  Cart,
  CartError,
} from 'aggregate/10_zod/domain/cart/cart.js';
import { CustomerId } from 'aggregate/10_zod/domain/customer/customerId.js';
import { Quantity } from 'aggregate/10_zod/domain/item/quantity.js';
import { ProductId } from 'aggregate/10_zod/domain/product/productId.js';
import type { ProductNotFoundError } from 'aggregate/10_zod/domain/product/productNotFoundError.js';
import type { UseCase } from 'aggregate/10_zod/useCase/useCase.js';
import * as z from 'zod';

export const schema = z
  .object({
    customerId: CustomerId.schema,
    productId: ProductId.schema,
    quantity: Quantity.schema,
  })
  .readonly();

export type Input = z.infer<typeof schema>;

export type Output = Cart;

export type UseCaseError = CartError | ProductNotFoundError;

export type UpdateCartItemQuantityUseCase = UseCase<
  Input,
  Cart,
  UseCaseError
>;
