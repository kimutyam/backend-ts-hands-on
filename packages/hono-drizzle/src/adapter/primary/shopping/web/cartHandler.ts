import type { RouteHandler } from '@hono/zod-openapi';

import { GetCart } from '../../../../app/port/primary/shopping/getCart.js';
import type { GetCartRoute } from './cartRoute.js';

const create =
  (getCart: GetCart): RouteHandler<typeof GetCartRoute> =>
  async (c) => {
    const { id } = c.req.valid('param');
    const cartItems = await getCart(id);
    return c.json(cartItems, 200);
  };

create.inject = [GetCart.token] as const;

const CartHandler = {
  token: 'CartHandler',
  create,
} as const;

export { CartHandler };
