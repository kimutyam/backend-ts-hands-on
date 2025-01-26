import type { ResultAsync } from 'neverthrow';
import { Cart } from '../../domain/cart/cart.js';
import type { CartResolver, CartStorer } from '../../domain/cart/cartRepository.js';
import type { ProductResolver } from '../../domain/product/productRepository.js';
import type { Input, Output, RemoveCartItemUseCase, UseCaseError } from './useCase.js';

export class RemoveCartItemInteractor implements RemoveCartItemUseCase {
  constructor(
    private cartResolver: CartResolver,
    private cartStorer: CartStorer,
    private productResolver: ProductResolver,
  ) {}

  run({ customerId, productId }: Input): ResultAsync<Output, UseCaseError> {
    return this.productResolver
      .resolveBy(productId)
      .map(() => this.cartResolver.resolveById(customerId))
      .map(Cart.removeItem(productId))
      .map(this.cartStorer.store);
  }
}
