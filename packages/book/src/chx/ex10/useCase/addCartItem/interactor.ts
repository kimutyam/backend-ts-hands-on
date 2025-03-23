import { Cart } from 'chx/ex10/domain/cart/cart.js';
import type {
  CartResolver,
  CartStorer,
} from 'chx/ex10/domain/cart/cartRepository.js';
import type { ProductResolver } from 'chx/ex10/domain/product/productRepository.js';
import type {
  AddCartItemUseCase,
  Input,
  Output,
  UseCaseError,
} from 'chx/ex10/useCase/addCartItem/useCase.js';
import { ResultAsync } from 'neverthrow';

export class AddItemCartInteractor implements AddCartItemUseCase {
  constructor(
    private readonly cartResolver: CartResolver,
    private readonly cartStorer: CartStorer,
    private readonly productResolver: ProductResolver,
  ) {}

  run = ({
    customerId,
    productId,
    quantity,
  }: Input): ResultAsync<Output, UseCaseError> =>
    this.productResolver
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
