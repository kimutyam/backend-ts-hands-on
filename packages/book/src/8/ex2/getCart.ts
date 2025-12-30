import type { CartItem } from '../ex1/cartItem.js';
import type { CustomerId } from '../ex1/customerId.js';
import type { FindCartById } from './cartRepository.js';

type GetCart = (customerId: CustomerId) => Promise<ReadonlyArray<CartItem>>;

const create =
  (findCartById: FindCartById): GetCart =>
  async (customerId) =>
    findCartById(customerId)
      .map((cart) => cart.cartItems)
      .unwrapOr<ReadonlyArray<CartItem>>([]);

const GetCart = {
  create,
} as const;

export { GetCart };
