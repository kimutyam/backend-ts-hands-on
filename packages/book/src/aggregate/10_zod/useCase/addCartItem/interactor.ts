import { ResultAsync } from 'neverthrow';
import { Cart } from '../../domain/cart/cart';
import type { CartResolver, CartStorer } from '../../domain/cart/cartRepository';
import type { ProductResolver } from '../../domain/product/productRepository';
import type { AddCartItemUseCase, Input, Output, UseCaseError } from './useCase';

export class AddItemCartInteractor implements AddCartItemUseCase {
  constructor(
    private readonly cartResolver: CartResolver,
    private readonly cartStorer: CartStorer,
    private readonly productResolver: ProductResolver,
  ) {}

  run({ customerId, productId, quantity }: Input): ResultAsync<Output, UseCaseError> {
    return this.productResolver
      .resolveBy(productId)
      .map((product) => ({
        productId: product.aggregateId,
        quantity,
        price: product.props.price,
      }))
      .andThen((item) =>
        ResultAsync.fromSafePromise(this.cartResolver.resolveById(customerId)).andThen(
          Cart.addItem(item),
        ),
      )
      .map(this.cartStorer.store);
  }
}
