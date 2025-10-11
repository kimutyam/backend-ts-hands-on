import { Cart } from '../domain/cart/cart.js';
import type {
  CartItemAdded,
  CartItemUpdated,
} from '../domain/cart/cartEvent.js';
import type { AddCartItem } from '../port/primary/shopping/addCartItem.js';
import { StoreCartEvent } from '../port/secondary/persistence/cartEventStore.js';
import { FindCartById } from '../port/secondary/persistence/cartRepository.js';
import { FindProductById } from '../port/secondary/persistence/productRepository.js';

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
