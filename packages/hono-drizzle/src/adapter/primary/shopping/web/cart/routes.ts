import { createRoute } from '@hono/zod-openapi';

import {
  createErrorSchema,
  createValidationErrorSchema,
} from '../errorSchemas.js';
import {
  AddCartItemRequestSchema,
  AddCartItemResponseSchema,
  CartIdParamSchema,
  GetCartResponseSchema,
} from './schemas.js';

const GetCartRoute = createRoute({
  method: 'get',
  path: '/carts/{id}',
  tags: ['Cart'],
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

const AddCartItemRoute = createRoute({
  method: 'post',
  path: '/carts/items',
  tags: ['Cart'],
  operationId: 'AddCartItem',
  request: {
    body: {
      content: {
        'application/json': {
          schema: AddCartItemRequestSchema,
        },
      },
      description: 'Cart Item to add',
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: {
        'application/json': {
          schema: AddCartItemResponseSchema,
        },
      },
    },
    400: {
      content: {
        'application/json': {
          schema: createErrorSchema('Bad Request'),
        },
      },
      description: 'Bad Request',
    },
    404: {
      content: {
        'application/json': {
          schema: createErrorSchema('Not Found'),
        },
      },
      description: 'Not Found',
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

const ClearCartRoute = createRoute({
  method: 'delete',
  path: '/carts/{id}',
  tags: ['Cart'],
  operationId: 'DeleteCart',
  request: {
    params: CartIdParamSchema,
  },
  responses: {
    204: {
      description: 'No Content',
    },
    404: {
      content: {
        'application/json': {
          schema: createErrorSchema('Not Found'),
        },
      },
      description: 'Not Found',
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

export { GetCartRoute, AddCartItemRoute, ClearCartRoute };
