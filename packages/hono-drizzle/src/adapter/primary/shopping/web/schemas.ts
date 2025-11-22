import { z } from '@hono/zod-openapi';

import { Quantity } from '../../../../app/domain/cart/quantity.js';
import { CustomerId } from '../../../../app/domain/customer/customerId.js';
import { Price } from '../../../../app/domain/product/price.js';
import { ProductId } from '../../../../app/domain/product/productId.js';

const CartGetParamsSchema = z
  .object({
    id: CustomerId.schema.openapi({
      example: '01KAN6MY2AJFPVGQATAS6CK9XX',
    }),
  })
  .openapi('CartGetParams');

const ZodErrorSchema = z.object({
  title: z.string().openapi({
    example: 'Validation Error',
  }),
  issues: z
    .array(
      z.object({
        code: z.string().optional().openapi({
          example: 'invalid_type',
        }),
        input: z.string().optional().openapi({
          example: 'Priceless',
        }),
        path: z.array(z.union([z.string(), z.number(), z.string()])).openapi({
          example: ['age'],
        }),
        message: z.string().openapi({
          example: 'Expected number, received string',
        }),
      }),
    )
    .openapi('ValidationError'),
});

const CartItemSchema = z
  .object({
    productId: ProductId.schema.openapi({
      example: '01KAN6MY2AJFPVGQATAS6CK9XX',
      description: '商品ID (ULID)',
    }),
    price: Price.schema.openapi({
      example: 2_000,
      description: '価格 (円)',
    }),
    quantity: Quantity.schema.openapi({
      example: 2,
      description: '数量',
    }),
  })
  .openapi('CartItem');

export { CartGetParamsSchema, CartItemSchema, ZodErrorSchema };
