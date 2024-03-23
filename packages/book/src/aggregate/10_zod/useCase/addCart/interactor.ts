import type { ResultAsync } from 'neverthrow';
import { Cart } from '../../domain/cart/cart';
import type { CartResolver, CartStorer } from '../../domain/cart/cartRepository';
import type { ProductResolver } from '../../domain/product/productRepository';
import type { AddCartUseCase, Input, Output, UseCaseError } from './useCase';

export class AddCartInteractor implements AddCartUseCase {
  constructor(
    private cartResolver: CartResolver,
    private cartStorer: CartStorer,
    private productResolver: ProductResolver,
  ) {}

  run({ customerId, productId, orderQuantity }: Input): ResultAsync<Output, UseCaseError> {
    return this.productResolver
      .resolveBy(productId)
      .map((product) => ({
        productId: product.productId,
        orderQuantity,
        price: product.price,
      }))
      .andThen((orderItem) =>
        this.cartResolver.resolveBy(customerId).andThen(Cart.addOrderItem(orderItem)),
      )
      .map(this.cartStorer.store);
  }
}
