import type { RouteHandler } from '@hono/zod-openapi';

import { GetCart } from '../../../../../app/port/primary/shopping/getCart.js';
import type { GetCartRoute } from './routes.js';

const create =
  (getCart: GetCart): RouteHandler<typeof GetCartRoute> =>
  async (c) => {
    const { cartId } = c.req.valid('param');
    const cartItems = await getCart(cartId);
    return c.json(cartItems, 200);
  };

create.inject = [GetCart.token] as const;

const GetCartHandler = {
  token: 'GetCartHandler',
  create,
} as const;

export { GetCartHandler };
