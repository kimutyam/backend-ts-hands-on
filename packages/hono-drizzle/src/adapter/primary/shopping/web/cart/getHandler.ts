import type { RouteHandler } from '@hono/zod-openapi';

import type { AppVariables } from '#/adapter/primary/shopping/web/appVariables.js';
import type { GetCartRoute } from '#/adapter/primary/shopping/web/cart/routes.js';
import { GetCart } from '#/app/port/primary/shopping/getCart.js';

const create =
  (getCart: GetCart): RouteHandler<typeof GetCartRoute, AppVariables> =>
  async (c) => {
    const { cartId } = c.req.valid('param');
    const { cartItems } = await getCart(cartId);
    return c.json(cartItems, 200);
  };

create.inject = [GetCart.token] as const;

const GetCartHandler = {
  create,
} as const;

export { GetCartHandler };
