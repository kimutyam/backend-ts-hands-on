import type { RouteHandler } from '@hono/zod-openapi';

import { ClearCart } from '../../../../../app/port/primary/shopping/clearCart.js';
import type { DeleteCartRoute } from './routes.js';

const create =
  (clearCart: ClearCart): RouteHandler<typeof DeleteCartRoute> =>
  async (c) => {
    const { id } = c.req.valid('param');
    return clearCart(id).match(
      () => c.body(null, 204),
      (error) => c.json({ message: error.message }, 404),
    );
  };

create.inject = [ClearCart.token] as const;

const DeleteCartHandler = {
  token: 'DeleteCartHandler',
  create,
} as const;

export { DeleteCartHandler };
