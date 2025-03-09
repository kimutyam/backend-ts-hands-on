import type { Cart, CartError } from 'chx/ex10/domain/cart/cart.js';
import { CustomerId } from 'chx/ex10/domain/customer/customerId.js';
import type { QuantityError } from 'chx/ex10/domain/item/quantity.js';
import { Quantity } from 'chx/ex10/domain/item/quantity.js';
import { ProductId } from 'chx/ex10/domain/product/productId.js';
import type { ProductNotFoundError } from 'chx/ex10/domain/product/productNotFoundError.js';
import type { UseCase } from 'chx/ex10/useCase/useCase.js';
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

export type UseCaseError = CartError | QuantityError | ProductNotFoundError;

export type AddCartItemUseCase = UseCase<Input, Output, UseCaseError>;
