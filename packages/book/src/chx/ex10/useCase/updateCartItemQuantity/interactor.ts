import { Cart } from 'chx/ex10/domain/cart/cart.js';
import type {
  CartResolver,
  CartStorer,
} from 'chx/ex10/domain/cart/cartRepository.js';
import type { ProductResolver } from 'chx/ex10/domain/product/productRepository.js';
import type {
  Input,
  Output,
  UpdateCartItemQuantityUseCase,
  UseCaseError,
} from 'chx/ex10/useCase/updateCartItemQuantity/useCase.js';
import type { ResultAsync } from 'neverthrow';

export class UpdateCartItemQuantityInteractor
  implements UpdateCartItemQuantityUseCase
{
  constructor(
    private cartResolver: CartResolver,
    private cartStorer: CartStorer,
    private productResolver: ProductResolver,
  ) {}

  run = ({
    customerId,
    productId,
    quantity,
  }: Input): ResultAsync<Output, UseCaseError> =>
    this.productResolver
      .resolveBy(productId)
      .map(() => this.cartResolver.resolveById(customerId))
      .andThen(Cart.updateItemQuantity(productId, quantity))
      .map(this.cartStorer.store);
}
