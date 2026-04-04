import type { RouteHandler } from '@hono/zod-openapi';

import type { AppVariables } from '#/adapter/primary/shopping/web/appVariables.js';
import type { ClearCartRoute } from '#/adapter/primary/shopping/web/cart/routes.js';
import { ErrorSchema } from '#/adapter/primary/shopping/web/errorSchemas.js';
import { ClearCart } from '#/app/port/primary/shopping/clearCart.js';

const create =
  (clearCart: ClearCart): RouteHandler<typeof ClearCartRoute, AppVariables> =>
  async (c) => {
    const { cartId } = c.req.valid('param');
    return clearCart(cartId).match(
      () => c.body(null, 204),
      (error) =>
        c.json(
          ErrorSchema.parse({
            title: error.message,
          }),
          404,
        ),
    );
  };

create.inject = [ClearCart.token] as const;

const ClearCartHandler = {
  create,
} as const;

export { ClearCartHandler };
