import type { Cart } from '../../../domain/cart/cart.js';
import type { CustomerId } from '../../../domain/customer/customerId.js';

type GetCart = (customerId: CustomerId) => Promise<Cart>;

const GetCart = {
  token: 'GetCart',
} as const;

export { GetCart };
