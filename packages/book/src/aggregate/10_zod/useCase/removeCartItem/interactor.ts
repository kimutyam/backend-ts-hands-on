import type { ResultAsync } from 'neverthrow';
import { Cart } from '../../domain/cart/cart';
import type { CartResolver, CartStorer } from '../../domain/cart/cartRepository';
import type { ProductResolver } from '../../domain/product/productRepository';
import type { Input, Output, RemoveCartItemUseCase, UseCaseError } from './useCase';

export class RemoveCartItemInteractor implements RemoveCartItemUseCase {
  constructor(
    private cartResolver: CartResolver,
    private cartStorer: CartStorer,
    private productResolver: ProductResolver,
  ) {}

  run({ customerId, productId }: Input): ResultAsync<Output, UseCaseError> {
    return this.productResolver
      .resolveBy(productId)
      .map(() => this.cartResolver.resolveBy(customerId))
      .map(Cart.removeItem(productId))
      .map(this.cartStorer.store);
  }
}
