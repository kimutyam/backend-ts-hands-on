import type { RouteHandler } from '@hono/zod-openapi';

import type { AppVariables } from '#/adapter/primary/shopping/web/appVariables.js';
import type { RemoveCartItemRoute } from '#/adapter/primary/shopping/web/cart/routes.js';
import { ErrorSchema } from '#/adapter/primary/shopping/web/errorSchemas.js';
import { RemoveCartItem } from '#/app/port/primary/shopping/removeCartItem.js';

const create =
  (
    removeCartItem: RemoveCartItem,
  ): RouteHandler<typeof RemoveCartItemRoute, AppVariables> =>
  async (c) => {
    const { cartId, productId } = c.req.valid('param');
    return removeCartItem(cartId, productId).match(
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

create.inject = [RemoveCartItem.token] as const;

const RemoveCartItemHandler = {
  create,
} as const;

export { RemoveCartItemHandler };
