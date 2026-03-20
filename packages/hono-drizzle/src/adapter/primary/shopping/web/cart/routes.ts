import { createRoute } from '@hono/zod-openapi';

import { OpenApiResponseSpec } from '../openApiResponseSpec.js';
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
    ...OpenApiResponseSpec.create200(GetCartResponseSchema),
    ...OpenApiResponseSpec['422'],
    ...OpenApiResponseSpec['500'],
  },
});

const AddCartItemRoute = createRoute({
  method: 'post',
  path: '/carts/items',
  tags: ['Cart'],
  operationId: 'AddCartItem',
  request: {
    body: {
      description: 'Add Cart Items',
      required: true,
      content: {
        'application/json': {
          schema: AddCartItemRequestSchema,
        },
      },
    },
  },
  responses: {
    ...OpenApiResponseSpec.create201(AddCartItemResponseSchema),
    ...OpenApiResponseSpec['400'],
    ...OpenApiResponseSpec['404'],
    ...OpenApiResponseSpec['409'],
    ...OpenApiResponseSpec['422'],
    ...OpenApiResponseSpec['500'],
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
    ...OpenApiResponseSpec['204'],
    ...OpenApiResponseSpec['404'],
    ...OpenApiResponseSpec['409'],
    ...OpenApiResponseSpec['422'],
    ...OpenApiResponseSpec['500'],
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
    ...OpenApiResponseSpec['204'],
    ...OpenApiResponseSpec['404'],
    ...OpenApiResponseSpec['409'],
    ...OpenApiResponseSpec['422'],
    ...OpenApiResponseSpec['500'],
  },
});

export { GetCartRoute, AddCartItemRoute, RemoveCartItemRoute, ClearCartRoute };
