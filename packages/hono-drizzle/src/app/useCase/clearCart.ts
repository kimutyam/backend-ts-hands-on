import { Cart } from '#/app/domain/cart/cart.js';
import type { CartCleared } from '#/app/domain/cart/cartEvent.js';
import type { ClearCart } from '#/app/port/primary/shopping/clearCart.js';
import { StoreCartEvent } from '#/app/port/secondary/persistence/cartEventStore.js';
import { FindCartById } from '#/app/port/secondary/persistence/cartRepository.js';

const create =
  (
    findCartById: FindCartById,
    storeCartEvent: StoreCartEvent<CartCleared>,
  ): ClearCart =>
  (customerId) =>
    findCartById(customerId)
      .map(Cart.clear('OnManual'))
      .andThrough(([cart, cartEvent]) => storeCartEvent(cartEvent, cart))
      .map(([, cartEvent]) => cartEvent);

create.inject = [FindCartById.token, StoreCartEvent.token] as const;

const ClearCartUseCase = {
  create,
} as const;

export { ClearCartUseCase };
