import { createRoute } from '@hono/zod-openapi';

import { ErrorSchema, ValidationErrorSchema } from '../errorSchemas.js';
import {
  AddCartItemRequestSchema,
  AddCartItemResponseSchema,
  CartIdParamSchema,
  GetCartResponseSchema,
  RemoveCartItemParamsSchema,
} from './schemas.js';

const GetCartRoute = createRoute({
  method: 'get',
  path: '/carts/{cartId}',
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
      description: 'Unprocessable Content',
      content: {
        'application/json': {
          schema: ValidationErrorSchema,
        },
      },
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
      description: 'Cart Item to add',
      required: true,
      content: {
        'application/json': {
          schema: AddCartItemRequestSchema,
        },
      },
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
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
    404: {
      description: 'Not Found',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
    409: {
      description: 'Conflict',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
    422: {
      description: 'Unprocessable Content',
      content: {
        'application/json': {
          schema: ValidationErrorSchema,
        },
      },
    },
  },
});

const RemoveCartItemRoute = createRoute({
  method: 'delete',
  path: '/carts/{cartId}/items/{productId}',
  tags: ['Cart'],
  operationId: 'RemoveCartItem',
  request: {
    params: RemoveCartItemParamsSchema,
  },
  responses: {
    204: {
      description: 'No Content',
    },
    404: {
      description: 'Not Found',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
    409: {
      description: 'Conflict',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
    422: {
      description: 'Unprocessable Content',
      content: {
        'application/json': {
          schema: ValidationErrorSchema,
        },
      },
    },
  },
});

const ClearCartRoute = createRoute({
  method: 'delete',
  path: '/carts/{cartId}',
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
      description: 'Not Found',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
    409: {
      description: 'Conflict',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
    422: {
      description: 'Unprocessable Content',
      content: {
        'application/json': {
          schema: ValidationErrorSchema,
        },
      },
    },
  },
});

export { GetCartRoute, AddCartItemRoute, RemoveCartItemRoute, ClearCartRoute };
