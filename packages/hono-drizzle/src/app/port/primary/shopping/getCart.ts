import type { CartItem } from '../../../domain/cart/cartItem.js';
import type { CustomerId } from '../../../domain/customer/customerId.js';

type GetCart = (customerId: CustomerId) => Promise<ReadonlyArray<CartItem>>;

const GetCart = {
  token: 'GetCart',
} as const;

export { GetCart };
