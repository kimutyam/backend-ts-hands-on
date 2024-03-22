import type { ResultAsync } from 'neverthrow';
import { Cart } from '../../domain/order/cart';
import type { CartResolver, CartStorer } from '../../domain/order/cartRepository';
import type { Input, Output, RemoveFromCartUseCase, UseCaseError } from './useCase';

export class RemoveFromCartInteractor implements RemoveFromCartUseCase {
  constructor(
    private resolver: CartResolver,
    private storer: CartStorer,
  ) {}

  run({ customerId, productId }: Input): ResultAsync<Output, UseCaseError> {
    return this.resolver
      .resolveBy(customerId)
      .map(Cart.removeProduct(productId))
      .map((cart) => this.storer.store(cart));
  }
}
