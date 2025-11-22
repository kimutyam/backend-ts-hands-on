import { z } from '@hono/zod-openapi';

import { Quantity } from '../../../../../app/domain/cart/quantity.js';
import { CustomerId } from '../../../../../app/domain/customer/customerId.js';
import { Price } from '../../../../../app/domain/product/price.js';
import { ProductId } from '../../../../../app/domain/product/productId.js';

const CartIdParamSchema = z
  .object({
    id: CustomerId.schema.openapi({
      example: '01KAN6MY2AJFPVGQATAS6CK9XX',
    }),
  })
  .openapi('CartGetParams');

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

const GetCartResponseSchema = z.array(CartItemSchema).readonly();

export { CartIdParamSchema, GetCartResponseSchema };
