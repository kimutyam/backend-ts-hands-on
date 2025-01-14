import type { CartItem } from '../1/cartItem';
import type { CustomerId } from '../1/customerId';
import type { FindCartById } from './cartRepository';

const extractCartItem =
  (findCartById: FindCartById) =>
  async (customerId: CustomerId): Promise<ReadonlyArray<CartItem>> =>
    findCartById(customerId)
      .map((cart) => cart.cartItems)
      .unwrapOr([]);

export { extractCartItem };
