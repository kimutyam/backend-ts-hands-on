import { ResultAsync } from 'neverthrow';
import type { CartError } from '../../10_zod/domain/cart/cart.js';
import { Cart } from '../../10_zod/domain/cart/cart.js';
import type { CustomerId } from '../../10_zod/domain/customer/customerId.js';
import type {
  Quantity,
  QuantityError,
} from '../../10_zod/domain/item/quantity.js';
import type { ProductId } from '../../10_zod/domain/product/productId.js';
import type { ProductNotFoundError } from '../../10_zod/domain/product/productNotFoundError.js';
import type { ICartRepository } from '../domain/cartRepository.js';
import type { IProductRepository } from '../domain/productRespository.js';

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
