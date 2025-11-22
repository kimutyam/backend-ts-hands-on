import type { RouteHandler } from '@hono/zod-openapi';

import { ClearCart } from '../../../../../app/port/primary/shopping/clearCart.js';
import { createErrorSchema } from '../errorSchemas.js';
import type { ClearCartRoute } from './routes.js';

const create =
  (clearCart: ClearCart): RouteHandler<typeof ClearCartRoute> =>
  async (c) => {
    const { id } = c.req.valid('param');
    return clearCart(id).match(
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

create.inject = [ClearCart.token] as const;

const ClearCartHandler = {
  token: 'ClearCartHandler',
  create,
} as const;

export { ClearCartHandler };
