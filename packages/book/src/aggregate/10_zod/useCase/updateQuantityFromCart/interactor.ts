import type { ResultAsync } from 'neverthrow';
import { Cart } from '../../domain/cart/cart';
import type { CartResolver, CartStorer } from '../../domain/cart/cartRepository';
import type { ProductResolver } from '../../domain/product/productRepository';
import type { Input, Output, RemoveFromCartUseCase, UseCaseError } from './useCase';

export class RemoveFromCartInteractor implements RemoveFromCartUseCase {
  constructor(
    private cartResolver: CartResolver,
    private cartStorer: CartStorer,
    private productResolver: ProductResolver,
  ) {}

  run({ customerId, productId, quantity }: Input): ResultAsync<Output, UseCaseError> {
    return this.productResolver
      .resolveBy(productId)
      .map(() => this.cartResolver.resolveBy(customerId))
      .andThen(Cart.updateQuantity(productId, quantity))
      .map(this.cartStorer.store);
  }
}
