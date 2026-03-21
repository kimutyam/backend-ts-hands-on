import { okAsync } from 'neverthrow';

import { Cart } from '../domain/cart/cart.js';
import type {
  CartItemAdded,
  CartItemUpdated,
} from '../domain/cart/cartEvent.js';
import { CartItem } from '../domain/cart/cartItem.js';
import type { Quantity } from '../domain/cart/quantity.js';
import type { CustomerId } from '../domain/customer/customerId.js';
import type { Product } from '../domain/product/product.js';
import type { AddCartItem } from '../port/primary/shopping/addCartItem.js';
import { StoreCartEvent } from '../port/secondary/persistence/cartEventStore.js';
import { FindCartById } from '../port/secondary/persistence/cartRepository.js';
import { FindProductById } from '../port/secondary/persistence/productRepository.js';

const toCartItem =
  (quantity: Quantity) =>
  (product: Product): CartItem =>
    CartItem.parse({
      productId: product.aggregateId,
      quantity,
      price: product.price,
    });

const resolveCart =
  (customerId: CustomerId, findCartById: FindCartById) => (item: CartItem) =>
    findCartById(customerId)
      .orElse(() => okAsync(Cart.init(customerId)))
      .andThen((cart) => Cart.addCartItem(item)(cart));

const create =
  (
    findProductById: FindProductById,
    findCartById: FindCartById,
    storeCartEvent: StoreCartEvent<CartItemAdded | CartItemUpdated>,
  ): AddCartItem =>
  (customerId, productId, quantity) =>
    findProductById(productId)
      .map(toCartItem(quantity))
      .andThen(resolveCart(customerId, findCartById))
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
