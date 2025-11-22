import { createRoute } from '@hono/zod-openapi';

import {
  createErrorSchema,
  createValidationErrorSchema,
} from '../errorSchemas.js';
import { CartIdParamSchema, GetCartResponseSchema } from './schemas.js';

const GetCartRoute = createRoute({
  method: 'get',
  path: '/carts/{id}',
  tags: ['Carts'],
  operationId: 'GetCart',
  request: {
    params: CartIdParamSchema,
  },
  responses: {
    200: {
      description: 'Cart',
      content: {
        'application/json': {
          schema: GetCartResponseSchema,
        },
      },
    },
    422: {
      content: {
        'application/json': {
          schema: createValidationErrorSchema('Unprocessable Content'),
        },
      },
      description: 'Unprocessable Content',
    },
  },
});

const DeleteCartRoute = createRoute({
  method: 'delete',
  path: '/carts/{id}',
  tags: ['Carts'],
  operationId: 'DeleteCart',
  request: {
    params: CartIdParamSchema,
  },
  responses: {
    204: {
      description: 'No Content',
    },
    400: {
      content: {
        'application/json': {
          schema: createErrorSchema('Bad Request'),
        },
      },
      description: 'Bad Request',
    },
    422: {
      content: {
        'application/json': {
          schema: createValidationErrorSchema('Unprocessable Content'),
        },
      },
      description: 'Unprocessable Content',
    },
  },
});

export { GetCartRoute, DeleteCartRoute };
