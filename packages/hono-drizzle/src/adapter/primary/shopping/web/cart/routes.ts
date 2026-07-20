import { createRoute } from '@hono/zod-openapi';

import {
  AddCartItemRequestSchema,
  AddCartItemResponseSchema,
  ClearCartParamSchema,
  GetCartParamSchema,
  GetCartResponseSchema,
  RemoveCartItemParamsSchema,
} from '#/adapter/primary/shopping/web/cart/schemas.js';
import { OpenApiResponseSpec } from '#/adapter/primary/shopping/web/openApiResponseSpec.js';

const GetCartRoute = createRoute({
  method: 'get',
  path: '/carts/{cartId}',
  tags: ['Cart'],
  operationId: 'GetCart',
  request: {
    params: GetCartParamSchema,
  },
  responses: {
    ...OpenApiResponseSpec.create200(GetCartResponseSchema),
    ...OpenApiResponseSpec['400'],
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
    ...OpenApiResponseSpec['400'],
    ...OpenApiResponseSpec['404'],
    ...OpenApiResponseSpec['409'],
    ...OpenApiResponseSpec['500'],
  },
});

const ClearCartRoute = createRoute({
  method: 'delete',
  path: '/carts/{cartId}',
  tags: ['Cart'],
  operationId: 'DeleteCart',
  request: {
    params: ClearCartParamSchema,
  },
  responses: {
    ...OpenApiResponseSpec['204'],
    ...OpenApiResponseSpec['400'],
    ...OpenApiResponseSpec['404'],
    ...OpenApiResponseSpec['409'],
    ...OpenApiResponseSpec['500'],
  },
});

export { GetCartRoute, AddCartItemRoute, RemoveCartItemRoute, ClearCartRoute };
