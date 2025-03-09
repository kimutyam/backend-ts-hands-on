import type { CartError } from 'chx/ex10/domain/cart/cart.js';
import { Cart } from 'chx/ex10/domain/cart/cart.js';
import type { CustomerId } from 'chx/ex10/domain/customer/customerId.js';
import type {
  Quantity,
  QuantityError,
} from 'chx/ex10/domain/item/quantity.js';
import type { ProductId } from 'chx/ex10/domain/product/productId.js';
import type { ProductNotFoundError } from 'chx/ex10/domain/product/productNotFoundError.js';
import type { ICartRepository } from 'chx/ex20/domain/cartRepository.js';
import type { IProductRepository } from 'chx/ex20/domain/productRespository.js';
import { ResultAsync } from 'neverthrow';

export const addCartItem =
  (
    productRepository: IProductRepository,
    cartRepository: ICartRepository,
  ) =>
  (
    customerId: CustomerId,
    productId: ProductId,
    quantity: Quantity,
  ): ResultAsync<
    Cart,
    ProductNotFoundError | CartError | QuantityError
  > =>
    productRepository
      .findById(productId)
      .map((product) => ({
        productId: product.aggregateId,
        quantity,
        price: product.props.price,
      }))
      .andThen((item) =>
        ResultAsync.fromSafePromise(
          cartRepository.findById(customerId),
        ).andThen(Cart.addItem(item)),
      )
      .map(async (cart) => {
        await cartRepository.save(cart);
        return cart;
      });
