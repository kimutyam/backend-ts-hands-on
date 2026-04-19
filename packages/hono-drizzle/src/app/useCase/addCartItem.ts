import type { ResultAsync } from 'neverthrow';
import { okAsync } from 'neverthrow';

import { Cart } from '#/app/domain/cart/cart.js';
import type {
  CartItemAdded,
  CartItemUpdated,
} from '#/app/domain/cart/cartEvent.js';
import { CartItem } from '#/app/domain/cart/cartItem.js';
import type { Quantity } from '#/app/domain/cart/quantity.js';
import type { CustomerId } from '#/app/domain/customer/customerId.js';
import type { Product } from '#/app/domain/product/product.js';
import type { AddCartItem } from '#/app/port/primary/shopping/addCartItem.js';
import { StoreCartEvent } from '#/app/port/secondary/persistence/cartEventStore.js';
import { FindCartById } from '#/app/port/secondary/persistence/cartRepository.js';
import { FindProductById } from '#/app/port/secondary/persistence/productRepository.js';

const toCartItem =
  (quantity: Quantity) =>
  (product: Product): CartItem =>
    CartItem.parse({
      productId: product.aggregateId,
      quantity,
      price: product.price,
    });

const getCart = (
  customerId: CustomerId,
  findCartById: FindCartById,
): ResultAsync<Cart, never> =>
  findCartById(customerId).orElse(() => okAsync(Cart.init(customerId)));

const create =
  (
    findProductById: FindProductById,
    findCartById: FindCartById,
    storeCartEvent: StoreCartEvent<CartItemAdded | CartItemUpdated>,
  ): AddCartItem =>
  (customerId, productId, quantity) =>
    findProductById(productId)
      .map(toCartItem(quantity))
      .andThen((cartItem) =>
        getCart(customerId, findCartById).andThen(Cart.addCartItem(cartItem)),
      )
      .andTee(([cart, cartEvent]) => storeCartEvent(cartEvent, cart))
      .map(([, cartEvent]) => cartEvent);

create.inject = [
  FindProductById.token,
  FindCartById.token,
  StoreCartEvent.token,
] as const;

const AddCartItemUseCase = {
  create,
} as const;

export { AddCartItemUseCase };
