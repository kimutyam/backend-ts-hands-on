import type { Result } from 'neverthrow';
import { err, ResultAsync } from 'neverthrow';
import type { CartError } from '../../10_zod/domain/cart/cart';
import { Cart } from '../../10_zod/domain/cart/cart';
import type { Quantity, QuantityError } from '../../10_zod/domain/cart/quantity';
import type { CustomerId } from '../../10_zod/domain/customer/customerId';
import type { ProductId } from '../../10_zod/domain/product/productId';
import { ProductNotFoundError } from '../../10_zod/domain/product/productNotFoundError';
import type { ICartRepository } from '../domain/cartRepository';
import type { IProductRepository } from '../domain/productRespository';

export const addCartItem =
  (productRepository: IProductRepository, cartRepository: ICartRepository) =>
  async (
    customerId: CustomerId,
    productId: ProductId,
    quantity: Quantity,
  ): Promise<Result<Cart, ProductNotFoundError | CartError | QuantityError>> => {
    const product = await productRepository.findById(productId);
    if (product === undefined) {
      return err(new ProductNotFoundError(productId));
    }
    const item = {
      productId: product.aggregateId,
      quantity,
      price: product.props.price,
    };
    return new ResultAsync(cartRepository.findById(customerId).then(Cart.addItem(item))).map(
      async (cart) => {
        await cartRepository.save(cart);
        return cart;
      },
    );
  };
