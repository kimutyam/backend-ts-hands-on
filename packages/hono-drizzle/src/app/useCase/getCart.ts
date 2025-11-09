import type { CartItem } from '../domain/cart/cartItem.js';
import type { GetCart } from '../port/primary/shopping/getCart.js';
import { FindCartById } from '../port/secondary/persistence/cartRepository.js';

const create =
  (findCartById: FindCartById): GetCart =>
  (customerId) =>
    findCartById(customerId)
      .map((cart) => cart.cartItems)
      .unwrapOr<ReadonlyArray<CartItem>>([]);

create.inject = [FindCartById.token] as const;

const GetCartUseCase = {
  create,
} as const;

export { GetCartUseCase };
