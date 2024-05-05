import type { ResultAsync } from 'neverthrow';
import { Cart } from '../../domain/cart/cart';
import type { CartResolver, CartStorer } from '../../domain/cart/cartRepository';
import type { ProductResolver } from '../../domain/product/productRepository';
import type { Input, Output, UseCaseError, UpdateCartItemQuantityUseCase } from './useCase';

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
