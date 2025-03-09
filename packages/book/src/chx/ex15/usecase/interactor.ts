import type { CartError } from 'chx/ex10/domain/cart/cart.js';
import { Cart } from 'chx/ex10/domain/cart/cart.js';
import type { CustomerId } from 'chx/ex10/domain/customer/customerId.js';
import type { Quantity, QuantityError } from 'chx/ex10/domain/item/quantity.js';
import type { ProductId } from 'chx/ex10/domain/product/productId.js';
import { ProductNotFoundError } from 'chx/ex10/domain/product/productNotFoundError.js';
import type { ICartRepository } from 'chx/ex15/domain/cartRepository.js';
import type { IProductRepository } from 'chx/ex15/domain/productRespository.js';
import type { Result } from 'neverthrow';
import { err, ResultAsync } from 'neverthrow';

export const addCartItem =
  (productRepository: IProductRepository, cartRepository: ICartRepository) =>
  async (
    customerId: CustomerId,
    productId: ProductId,
    quantity: Quantity,
  ): Promise<
    Result<Cart, ProductNotFoundError | CartError | QuantityError>
  > => {
    const product = await productRepository.findById(productId);
    if (product === undefined) {
      return err(new ProductNotFoundError(productId));
    }
    const item = {
      productId: product.aggregateId,
      quantity,
      price: product.props.price,
    };
    return new ResultAsync(
      cartRepository.findById(customerId).then(Cart.addItem(item)),
    ).map(async (cart) => {
      await cartRepository.save(cart);
      return cart;
    });
  };
