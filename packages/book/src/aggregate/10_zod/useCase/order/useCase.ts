import * as z from 'zod';
import type { Cart, CartError } from '../../domain/cart/cart';
import { CustomerId } from '../../domain/customer/customerId';
import type { Order } from '../../domain/order/order';
import type { ProductsNotFoundError } from '../../domain/product/productsNotFoundError';
import type { UseCase } from '../useCase';

export const schema = z
  .object({
    customerId: CustomerId.schema,
  })
  .readonly();

export type Input = z.infer<typeof schema>;

export type Output = [Order, Cart];

export type UseCaseError = CartError | ProductsNotFoundError;

export type OrderUseCase = UseCase<Input, Output, UseCaseError>;
