import type {
  Cart,
  CartError,
} from 'aggregate/10_zod/domain/cart/cart.js';
import { CustomerId } from 'aggregate/10_zod/domain/customer/customerId.js';
import type { Order } from 'aggregate/10_zod/domain/order/order.js';
import type { ProductsNotFoundError } from 'aggregate/10_zod/domain/product/productsNotFoundError.js';
import type { UseCase } from 'aggregate/10_zod/useCase/useCase.js';
import * as z from 'zod';

export const schema = z
  .object({
    customerId: CustomerId.schema,
  })
  .readonly();

export type Input = z.infer<typeof schema>;

export type Output = [Order, Cart];

export type UseCaseError =
  | CartError
  | ProductsNotFoundError;

export type OrderUseCase = UseCase<
  Input,
  Output,
  UseCaseError
>;
