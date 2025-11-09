import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

import { CustomerId } from '../../../../app/domain/customer/customerId.js';
import { GetCart } from '../../../../app/port/primary/shopping/getCart.js';

const paramSchema = z.object({
  id: CustomerId.schema,
});

const create = (getCart: GetCart) => {
  const app = new Hono();
  app.get('/:id', zValidator('param', paramSchema), async (c) => {
    const { id } = c.req.valid('param');
    const cartItems = await getCart(id);
    return c.json(cartItems);
  });
  return app;
};

create.inject = [GetCart.token] as const;

const CartHandler = {
  token: 'CartHandler',
  create,
} as const;

export { CartHandler };
