import type { CartItem } from 'ch7/ex1/cartItem.js';
import type { CustomerId } from 'ch7/ex1/customerId.js';
import type { FindCartById } from 'ch7/ex2/cartRepository.js';

type ExtractCartItems = (
  customerId: CustomerId,
) => Promise<ReadonlyArray<CartItem>>;

const build =
  (findCartById: FindCartById): ExtractCartItems =>
  async (customerId: CustomerId): ReturnType<ExtractCartItems> =>
    findCartById(customerId)
      .map((cart) => cart.cartItems)
      .unwrapOr([]);

const ExtractCartItems = {
  build,
} as const;

export { ExtractCartItems };

build.inject = ['findCartById'] as const;
