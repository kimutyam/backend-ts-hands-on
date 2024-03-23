import * as z from 'zod';
import type { Cart, CartError } from '../../domain/cart/cart';
import { OrderQuantity } from '../../domain/cart/orderQuantity';
import { CustomerId } from '../../domain/customer/customerId';
import { ProductId } from '../../domain/product/productId';
import type { ProductNotFoundError } from '../../domain/product/productNotFoundError';
import type { UseCase } from '../useCase';

const schema = z
  .object({
    customerId: CustomerId.schema,
    productId: ProductId.schema,
    quantity: OrderQuantity.schema,
  })
  .readonly();

export type Input = z.infer<typeof schema>;

export type Output = Cart;

export type UseCaseError = CartError | ProductNotFoundError;

export type RemoveFromCartUseCase = UseCase<Input, Cart, UseCaseError>;
