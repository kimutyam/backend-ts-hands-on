import type { CartItem } from '7_aggregate/1/cartItem.js';
import type { CustomerId } from '7_aggregate/1/customerId.js';
import type { FindCartById } from '7_aggregate/2_isp/cartRepository.js';

type ExtractCartItems = (
  customerId: CustomerId,
) => Promise<ReadonlyArray<CartItem>>;

const buildExtractCartItems =
  (findCartById: FindCartById): ExtractCartItems =>
  async (
    customerId: CustomerId,
  ): Promise<ReadonlyArray<CartItem>> =>
    findCartById(customerId)
      .map((cart) => cart.cartItems)
      .unwrapOr([]);

export { buildExtractCartItems, type ExtractCartItems };
