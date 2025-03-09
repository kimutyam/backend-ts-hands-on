import { Cart } from 'chx/ex10/domain/cart/cart.js';
import type {
  CartResolver,
  CartStorer,
} from 'chx/ex10/domain/cart/cartRepository.js';
import type { ProductResolver } from 'chx/ex10/domain/product/productRepository.js';
import type {
  Input,
  Output,
  RemoveCartItemUseCase,
  UseCaseError,
} from 'chx/ex10/useCase/removeCartItem/useCase.js';
import type { ResultAsync } from 'neverthrow';

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
