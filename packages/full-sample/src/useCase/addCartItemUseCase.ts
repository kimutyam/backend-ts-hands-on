import type { Cart } from '../domain/cart';
import type { CustomerId } from '../domain/customerId';
import type { UseCase } from './useCase';

export type Input = Readonly<{
  customerId: CustomerId;
  productId: string;
  quantity: number;
}>;

export type Output = { cart: Cart };

export type AddCartItemUseCase = UseCase<Input, Output>;

export const AddCartItemUseCase = {
  token: 'AddCartItemUseCase',
} as const;
