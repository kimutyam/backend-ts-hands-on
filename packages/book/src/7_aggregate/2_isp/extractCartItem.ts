import type { CartItem } from '../1/cartItem';
import type { CustomerId } from '../1/customerId';
import type { FindCartById } from './cartRepository';

const extractCartItem =
  (findCartById: FindCartById) =>
  async (customerId: CustomerId): Promise<ReadonlyArray<CartItem>> => {
    const maybeCart = await findCartById(customerId);
    return maybeCart ? maybeCart.cartItems : [];
  };

export { extractCartItem };
