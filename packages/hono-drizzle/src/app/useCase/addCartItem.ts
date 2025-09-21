import { Cart } from '../domain/cart/cart.js';
import type {
  CartItemAdded,
  CartItemUpdated,
} from '../domain/cart/cartEvent.js';
import type { AddCartItem } from '../port/primary/shopping/addCartItem.js';
import type { StoreCartEvent } from '../port/secondary/db/cartEventStore.js';
import type { FindCartById } from '../port/secondary/db/cartRepository.js';
import type { FindProductById } from '../port/secondary/db/productRepository.js';

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

export { buildAddCartItem };
