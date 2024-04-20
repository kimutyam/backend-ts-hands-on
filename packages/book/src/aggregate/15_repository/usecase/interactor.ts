import type { Result } from 'neverthrow';
import { err, ResultAsync } from 'neverthrow';
import type { CartError } from '../../10_zod/domain/cart/cart';
import { Cart } from '../../10_zod/domain/cart/cart';
import type { OrderQuantity, OrderQuantityError } from '../../10_zod/domain/cart/orderQuantity';
import type { CustomerId } from '../../10_zod/domain/customer/customerId';
import type { ProductId } from '../../10_zod/domain/product/productId';
import { ProductNotFoundError } from '../../10_zod/domain/product/productNotFoundError';
import type { ICartRepository } from '../domain/cartRepository';
import type { IProductRespository } from '../domain/productRespository';

export const addToCart =
  (productRepository: IProductRespository, cartRepository: ICartRepository) =>
  async (
    customerId: CustomerId,
    productId: ProductId,
    orderQuantity: OrderQuantity,
  ): Promise<Result<Cart, ProductNotFoundError | CartError | OrderQuantityError>> => {
    const product = await productRepository.findById(productId);
    if (product === undefined) {
      return err(new ProductNotFoundError(productId));
    }
    const orderItem = {
      productId: product.productId,
      orderQuantity,
      price: product.price,
    };
    return new ResultAsync(
      cartRepository.findById(customerId).then(Cart.addOrderItem(orderItem)),
    ).map(async (cart) => {
      await cartRepository.save(cart);
      return cart;
    });
  };
