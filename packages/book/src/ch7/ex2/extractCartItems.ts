import type { CartItem } from '../ex1/cartItem.js';
import type { CustomerId } from '../ex1/customerId.js';
import type { FindCartById } from './cartRepository.js';

type ExtractCartItems = (
  customerId: CustomerId,
) => Promise<ReadonlyArray<CartItem>>;

const create =
  (findCartById: FindCartById): ExtractCartItems =>
  async (customerId) =>
    findCartById(customerId)
      .map((cart) => cart.cartItems)
      .unwrapOr<ReadonlyArray<CartItem>>([]);

const ExtractCartItems = {
  create,
} as const;

export { ExtractCartItems };
