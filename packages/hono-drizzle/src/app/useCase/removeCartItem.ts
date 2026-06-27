import { Cart } from '#/app/domain/cart/cart.js';
import type { CartItemRemoved } from '#/app/domain/cart/cartEvent.js';
import type { RemoveCartItem } from '#/app/port/primary/shopping/removeCartItem.js';
import { StoreCartEvent } from '#/app/port/secondary/persistence/cartEventStore.js';
import { FindCartById } from '#/app/port/secondary/persistence/cartRepository.js';

const create =
  (
    findCartById: FindCartById,
    storeCartEvent: StoreCartEvent<CartItemRemoved>,
  ): RemoveCartItem =>
  (customerId, productId) =>
    findCartById(customerId)
      .andThen(Cart.removeCartItem(productId))
      .andThrough(([cart, cartEvent]) => storeCartEvent(cartEvent, cart))
      .map(([, cartEvent]) => cartEvent);

create.inject = [FindCartById.token, StoreCartEvent.token] as const;

const RemoveCartItemUseCase = {
  create,
} as const;

export { RemoveCartItemUseCase };
