import type { ResultAsync } from 'neverthrow';
import { Cart } from '../../domain/cart/cart.js';
import type { CartResolver, CartStorer } from '../../domain/cart/cartRepository.js';
import type { ProductResolver } from '../../domain/product/productRepository.js';
import type { Input, Output, UpdateCartItemQuantityUseCase, UseCaseError } from './useCase.js';

export class UpdateCartItemQuantityInteractor implements UpdateCartItemQuantityUseCase {
  constructor(
    private cartResolver: CartResolver,
    private cartStorer: CartStorer,
    private productResolver: ProductResolver,
  ) {}

  run({ customerId, productId, quantity }: Input): ResultAsync<Output, UseCaseError> {
    return this.productResolver
      .resolveBy(productId)
      .map(() => this.cartResolver.resolveById(customerId))
      .andThen(Cart.updateItemQuantity(productId, quantity))
      .map(this.cartStorer.store);
  }
}
