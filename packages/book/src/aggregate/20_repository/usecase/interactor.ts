import { ResultAsync } from 'neverthrow';
import type { CartError } from '../../10_zod/domain/cart/cart';
import { Cart } from '../../10_zod/domain/cart/cart';
import type { OrderQuantity, OrderQuantityError } from '../../10_zod/domain/cart/orderQuantity';
import type { CustomerId } from '../../10_zod/domain/customer/customerId';
import type { ProductId } from '../../10_zod/domain/product/productId';
import type { ProductNotFoundError } from '../../10_zod/domain/product/productNotFoundError';
import type { ICartRepository } from '../domain/cartRepository';
import type { IProductRespository } from '../domain/productRespository';

export const addToCart =
  (productRepository: IProductRespository, cartRepository: ICartRepository) =>
  (
    customerId: CustomerId,
    productId: ProductId,
    orderQuantity: OrderQuantity,
  ): ResultAsync<Cart, ProductNotFoundError | CartError | OrderQuantityError> =>
    productRepository
      .findById(productId)
      .map((product) => ({
        productId: product.productId,
        orderQuantity,
        price: product.price,
      }))
      .andThen((orderItem) =>
        ResultAsync.fromSafePromise(cartRepository.findById(customerId)).andThen(
          Cart.addOrderItem(orderItem),
        ),
      )
      .map(async (cart) => {
        await cartRepository.save(cart);
        return cart;
      });
