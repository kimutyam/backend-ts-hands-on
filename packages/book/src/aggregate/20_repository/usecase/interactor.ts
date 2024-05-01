import { ResultAsync } from 'neverthrow';
import type { CartError } from '../../10_zod/domain/cart/cart';
import { Cart } from '../../10_zod/domain/cart/cart';
import type { Quantity, QuantityError } from '../../10_zod/domain/cart/quantity';
import type { CustomerId } from '../../10_zod/domain/customer/customerId';
import type { ProductId } from '../../10_zod/domain/product/productId';
import type { ProductNotFoundError } from '../../10_zod/domain/product/productNotFoundError';
import type { ICartRepository } from '../domain/cartRepository';
import type { IProductRespository } from '../domain/productRespository';

export const addCartItem =
  (productRepository: IProductRespository, cartRepository: ICartRepository) =>
  (
    customerId: CustomerId,
    productId: ProductId,
    quantity: Quantity,
  ): ResultAsync<Cart, ProductNotFoundError | CartError | QuantityError> =>
    productRepository
      .findById(productId)
      .map((product) => ({
        productId: product.productId,
        quantity,
        price: product.price,
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
