import * as z from 'zod';
import { CustomerId } from '../../domain/customer/customerId';
import type { Cart, CartError } from '../../domain/order/cart';
import { OrderQuantity } from '../../domain/order/orderQuantity';
import { ProductId } from '../../domain/product/productId';
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

export type UseCaseError = CartError;

export type RemoveFromCartUseCase = UseCase<Input, Cart, UseCaseError>;