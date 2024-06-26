import { ResultAsync } from 'neverthrow';
import type { CartError } from '../../10_zod/domain/cart/cart';
import { Cart } from '../../10_zod/domain/cart/cart';
import type { CustomerId } from '../../10_zod/domain/customer/customerId';
import type { Quantity, QuantityError } from '../../10_zod/domain/item/quantity';
import type { ProductId } from '../../10_zod/domain/product/productId';
import type { ProductNotFoundError } from '../../10_zod/domain/product/productNotFoundError';
import type { ICartRepository } from '../domain/cartRepository';
import type { IProductRepository } from '../domain/productRespository';

export const addCartItem =
  (productRepository: IProductRepository, cartRepository: ICartRepository) =>
  (
    customerId: CustomerId,
    productId: ProductId,
    quantity: Quantity,
  ): ResultAsync<Cart, ProductNotFoundError | CartError | QuantityError> =>
    productRepository
      .findById(productId)
      .map((product) => ({
        productId: product.aggregateId,
        quantity,
        price: product.props.price,
      }))
      .andThen((item) =>
        ResultAsync.fromSafePromise(cartRepository.findById(customerId)).andThen(
          Cart.addItem(item),
        ),
      )
      .map(async (cart) => {
        await cartRepository.save(cart);
        return cart;
      });
