import type { Result } from 'neverthrow';
import { err, ResultAsync } from 'neverthrow';
import type { CartError } from '../../10_zod/domain/cart/cart.js';
import { Cart } from '../../10_zod/domain/cart/cart.js';
import type { CustomerId } from '../../10_zod/domain/customer/customerId.js';
import type {
  Quantity,
  QuantityError,
} from '../../10_zod/domain/item/quantity.js';
import type { ProductId } from '../../10_zod/domain/product/productId.js';
import { ProductNotFoundError } from '../../10_zod/domain/product/productNotFoundError.js';
import type { ICartRepository } from '../domain/cartRepository.js';
import type { IProductRepository } from '../domain/productRespository.js';

export const addCartItem =
  (
    productRepository: IProductRepository,
    cartRepository: ICartRepository,
  ) =>
  async (
    customerId: CustomerId,
    productId: ProductId,
    quantity: Quantity,
  ): Promise<
    Result<
      Cart,
      ProductNotFoundError | CartError | QuantityError
    >
  > => {
    const product =
      await productRepository.findById(productId);
    if (product === undefined) {
      return err(new ProductNotFoundError(productId));
    }
    const item = {
      productId: product.aggregateId,
      quantity,
      price: product.props.price,
    };
    return new ResultAsync(
      cartRepository
        .findById(customerId)
        .then(Cart.addItem(item)),
    ).map(async (cart) => {
      await cartRepository.save(cart);
      return cart;
    });
  };
