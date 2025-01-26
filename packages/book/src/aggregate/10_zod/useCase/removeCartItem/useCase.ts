import * as z from 'zod';
import type { Cart, CartError } from '../../domain/cart/cart.js';
import { CustomerId } from '../../domain/customer/customerId.js';
import { ProductId } from '../../domain/product/productId.js';
import type { ProductNotFoundError } from '../../domain/product/productNotFoundError.js';
import type { UseCase } from '../useCase.js';

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
