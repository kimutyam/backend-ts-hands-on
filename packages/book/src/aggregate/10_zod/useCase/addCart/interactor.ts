import type { ResultAsync } from 'neverthrow';
import { Cart } from '../../domain/order/cart';
import type { CartResolver, CartStorer } from '../../domain/order/cartRepository';
import type { AddCartUseCase, Input, Output, UseCaseError } from './useCase';

export class AddCartInteractor implements AddCartUseCase {
  constructor(
    private resolver: CartResolver,
    private storer: CartStorer,
  ) {}

  run({ customerId, productId }: Input): ResultAsync<Output, UseCaseError> {
    return this.resolver
      .resolveBy(customerId)
      .andThen(Cart.addProduct(productId))
      .map((cart) => this.storer.store(cart));
  }
}
