import { ResultAsync } from 'neverthrow';
import { Cart } from '../../domain/cart/cart.js';
import type {
  CartResolver,
  CartStorer,
} from '../../domain/cart/cartRepository.js';
import type { ProductResolver } from '../../domain/product/productRepository.js';
import type {
  AddCartItemUseCase,
  Input,
  Output,
  UseCaseError,
} from './useCase.js';

export class AddItemCartInteractor
  implements AddCartItemUseCase
{
  constructor(
    private readonly cartResolver: CartResolver,
    private readonly cartStorer: CartStorer,
    private readonly productResolver: ProductResolver,
  ) {}

  run({
    customerId,
    productId,
    quantity,
  }: Input): ResultAsync<Output, UseCaseError> {
    return this.productResolver
      .resolveBy(productId)
      .map((product) => ({
        productId: product.aggregateId,
        quantity,
        price: product.props.price,
      }))
      .andThen((item) =>
        ResultAsync.fromSafePromise(
          this.cartResolver.resolveById(customerId),
        ).andThen(Cart.addItem(item)),
      )
      .map(this.cartStorer.store);
  }
}
