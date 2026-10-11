import type { Cart } from '#/app/domain/cart/cart.js';
import type { CustomerId } from '#/app/domain/customer/customerId.js';

type GetCart = (customerId: CustomerId) => Promise<Cart>;

const GetCart = {
  token: 'GetCart',
} as const;

export { GetCart };
