import { Cart } from '../domain/cart/cart.js';
import type {
  CartItemAdded,
  CartItemUpdated,
} from '../domain/cart/cartEvent.js';
import type { AddCartItem } from '../port/primary/shopping/addCartItem.js';
import { StoreCartEvent } from '../port/secondary/db/cartEventStore.js';
import { FindCartById } from '../port/secondary/db/cartRepository.js';
import { FindProductById } from '../port/secondary/db/productRepository.js';

const buildAddCartItem =
  (
    findProductById: FindProductById,
    findCartById: FindCartById,
    storeCartEvent: StoreCartEvent<CartItemAdded | CartItemUpdated>,
  ): AddCartItem =>
  (customerId, productId, quantity) =>
    findProductById(productId)
      .map((product) => ({
        productId: product.aggregateId,
        quantity,
        price: product.price,
      }))
      .andThen((item) =>
        findCartById(customerId).andThen((existingCart) =>
          Cart.addCartItem(item)(existingCart),
        ),
      )
      .map(async ([cart, cartEvent]) => {
        await storeCartEvent(cartEvent, cart);
        return cartEvent;
      });

buildAddCartItem.inject = [
  FindProductById.token,
  FindCartById.token,
  StoreCartEvent.token,
] as const;

export { buildAddCartItem };
