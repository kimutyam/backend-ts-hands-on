import type { RouteHandler } from '@hono/zod-openapi';

import { CartRefinementsError } from '../../../../../app/domain/cart/cartRefinementsError.js';
import { QuantityRefinementsError } from '../../../../../app/domain/cart/quantity.js';
import { ProductNotFoundError } from '../../../../../app/domain/product/productNotFoundError.js';
import { AddCartItem } from '../../../../../app/port/primary/shopping/addCartItem.js';
import { assertNever } from '../../../../../app/util/assertNever.js';
import { createErrorSchema } from '../errorSchemas.js';
import type { AddCartItemRoute } from './routes.js';

const create =
  (addCartItem: AddCartItem): RouteHandler<typeof AddCartItemRoute> =>
  async (c) => {
    const { cartId, productId, quantity } = c.req.valid('json');
    return addCartItem(cartId, productId, quantity).match(
      (event) =>
        c.json(
          {
            eventName: event.eventName,
            item: event.payload.cartItem,
          },
          201,
        ),
      (error) => {
        switch (error.kind) {
          case ProductNotFoundError.kind:
            return c.json(
              createErrorSchema().parse({
                title: error.message,
              }),
              404,
            );
          case CartRefinementsError.kind:
          case QuantityRefinementsError.kind:
            return c.json(
              createErrorSchema().parse({
                title: error.message,
              }),
              400,
            );
          default:
            return assertNever(error);
        }
      },
    );
  };

create.inject = [AddCartItem.token] as const;

const AddCartItemHandler = {
  token: 'AddCartItemHandler',
  create,
} as const;

export { AddCartItemHandler };
