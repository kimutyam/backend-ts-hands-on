import { createRoute, z } from '@hono/zod-openapi';

import {
  CartGetParamsSchema,
  CartItemSchema,
  ZodErrorSchema,
} from './schemas.js';

const GetCartRoute = createRoute({
  method: 'get',
  path: '/carts/{id}',
  tags: ['Carts'],
  operationId: 'GetCart',
  request: {
    params: CartGetParamsSchema,
  },
  responses: {
    200: {
      description: 'カート項目一覧の取得',
      content: {
        'application/json': {
          schema: z.array(CartItemSchema).readonly(),
        },
      },
    },
    422: {
      content: {
        'application/json': {
          schema: ZodErrorSchema,
        },
      },
      description: 'The validation error(s)',
    },
  },
});

export { GetCartRoute };
