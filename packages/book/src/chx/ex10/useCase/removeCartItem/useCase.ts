import type { Cart, CartError } from 'chx/ex10/domain/cart/cart.js';
import { CustomerId } from 'chx/ex10/domain/customer/customerId.js';
import { ProductId } from 'chx/ex10/domain/product/productId.js';
import type { ProductNotFoundError } from 'chx/ex10/domain/product/productNotFoundError.js';
import type { UseCase } from 'chx/ex10/useCase/useCase.js';
import * as z from 'zod';

export const schema = z
  .object({
    customerId: CustomerId.schema,
    productId: ProductId.schema,
  })
  .readonly();

export type Input = z.infer<typeof schema>;

export type Output = Cart;

export type UseCaseError = CartError | ProductNotFoundError;

export type RemoveCartItemUseCase = UseCase<Input, Output, UseCaseError>;
