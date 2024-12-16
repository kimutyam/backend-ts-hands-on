import * as z from 'zod';
import type { Cart, CartError } from '../../domain/cart/cart';
import { CustomerId } from '../../domain/customer/customerId';
import type { QuantityError } from '../../domain/item/quantity';
import { Quantity } from '../../domain/item/quantity';
import { ProductId } from '../../domain/product/productId';
import type { ProductNotFoundError } from '../../domain/product/productNotFoundError';
import type { UseCase } from '../useCase';

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
