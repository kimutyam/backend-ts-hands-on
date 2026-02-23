import { createRoute } from '@hono/zod-openapi';

import {
  createOpenApiResponse200,
  createOpenApiResponse201,
  OpenApiResponse204,
  OpenApiResponse400,
  OpenApiResponse404,
  OpenApiResponse409,
  OpenApiResponse422,
  OpenApiResponse500,
} from '../responseSchemas.js';
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
    ...createOpenApiResponse200(GetCartResponseSchema),
    ...OpenApiResponse422,
    ...OpenApiResponse500,
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
    ...createOpenApiResponse201(AddCartItemResponseSchema),
    ...OpenApiResponse400,
    ...OpenApiResponse404,
    ...OpenApiResponse409,
    ...OpenApiResponse422,
    ...OpenApiResponse500,
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
    ...OpenApiResponse204,
    ...OpenApiResponse404,
    ...OpenApiResponse409,
    ...OpenApiResponse422,
    ...OpenApiResponse500,
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
    ...OpenApiResponse204,
    ...OpenApiResponse404,
    ...OpenApiResponse409,
    ...OpenApiResponse422,
    ...OpenApiResponse500,
  },
});

export { GetCartRoute, AddCartItemRoute, RemoveCartItemRoute, ClearCartRoute };
