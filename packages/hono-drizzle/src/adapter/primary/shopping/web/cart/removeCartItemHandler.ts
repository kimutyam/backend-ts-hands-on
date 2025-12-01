import type { RouteHandler } from '@hono/zod-openapi';

import { RemoveCartItem } from '../../../../../app/port/primary/shopping/removeCartItem.js';
import { createErrorSchema } from '../errorSchemas.js';
import type { RemoveCartItemRoute } from './routes.js';

const create =
  (removeCartItem: RemoveCartItem): RouteHandler<typeof RemoveCartItemRoute> =>
  async (c) => {
    const { cartId, productId } = c.req.valid('param');
    return removeCartItem(cartId, productId).match(
      () => c.body(null, 204),
      (error) =>
        c.json(
          createErrorSchema().parse({
            title: error.message,
          }),
          404,
        ),
    );
  };

create.inject = [RemoveCartItem.token] as const;

const RemoveCartItemHandler = {
  token: 'RemoveCartItemHandler',
  create,
} as const;

export { RemoveCartItemHandler };
