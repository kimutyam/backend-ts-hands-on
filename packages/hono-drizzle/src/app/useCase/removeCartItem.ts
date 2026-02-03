import { Cart } from '../domain/cart/cart.js';
import type { CartItemRemoved } from '../domain/cart/cartEvent.js';
import type { RemoveCartItem } from '../port/primary/shopping/removeCartItem.js';
import { StoreCartEvent } from '../port/secondary/persistence/cartEventStore.js';
import { FindCartById } from '../port/secondary/persistence/cartRepository.js';

const create =
  (
    findCartById: FindCartById,
    storeCartEvent: StoreCartEvent<CartItemRemoved>,
  ): RemoveCartItem =>
  (customerId, productId) =>
    findCartById(customerId)
      .andThen(Cart.removeCartItem(productId))
      .andTee(([cart, cartEvent]) => storeCartEvent(cartEvent, cart))
      .map(([, cartEvent]) => cartEvent);

create.inject = [FindCartById.token, StoreCartEvent.token] as const;

const RemoveCartItemUseCase = {
  create,
} as const;

export { RemoveCartItemUseCase };
