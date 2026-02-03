import { Cart } from '../domain/cart/cart.js';
import type { CartCleared } from '../domain/cart/cartEvent.js';
import type { ClearCart } from '../port/primary/shopping/clearCart.js';
import { StoreCartEvent } from '../port/secondary/persistence/cartEventStore.js';
import { FindCartById } from '../port/secondary/persistence/cartRepository.js';

const create =
  (
    findCartById: FindCartById,
    storeCartEvent: StoreCartEvent<CartCleared>,
  ): ClearCart =>
  (customerId) =>
    findCartById(customerId)
      .map(Cart.clear('OnManual'))
      .andTee(([cart, cartEvent]) => storeCartEvent(cartEvent, cart))
      .map(([, cartEvent]) => cartEvent);

create.inject = [FindCartById.token, StoreCartEvent.token] as const;

const ClearCartUseCase = {
  create,
} as const;

export { ClearCartUseCase };
