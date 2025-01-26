import type { CartItem } from '../1/cartItem.js';
import type { CustomerId } from '../1/customerId.js';
import type { FindCartById } from './cartRepository.js';

type ExtractCartItems = (customerId: CustomerId) => Promise<ReadonlyArray<CartItem>>;

const buildExtractCartItems =
  (findCartById: FindCartById): ExtractCartItems =>
  async (customerId: CustomerId): Promise<ReadonlyArray<CartItem>> =>
    findCartById(customerId)
      .map((cart) => cart.cartItems)
      .unwrapOr([]);

export { buildExtractCartItems, type ExtractCartItems };
