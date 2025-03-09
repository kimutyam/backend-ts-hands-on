import type { Cart, CartError } from 'chx/ex10/domain/cart/cart.js';
import { CustomerId } from 'chx/ex10/domain/customer/customerId.js';
import type { Order } from 'chx/ex10/domain/order/order.js';
import type { ProductsNotFoundError } from 'chx/ex10/domain/product/productsNotFoundError.js';
import type { UseCase } from 'chx/ex10/useCase/useCase.js';
import * as z from 'zod';

export const schema = z
  .object({
    customerId: CustomerId.schema,
  })
  .readonly();

export type Input = z.infer<typeof schema>;

export type Output = [Order, Cart];

export type UseCaseError = CartError | ProductsNotFoundError;

export type OrderUseCase = UseCase<Input, Output, UseCaseError>;
