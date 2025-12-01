import { z } from '@hono/zod-openapi';

import {
  CartItemAdded,
  CartItemUpdated,
} from '../../../../../app/domain/cart/cartEvent.js';
import { Quantity } from '../../../../../app/domain/cart/quantity.js';
import { CustomerId } from '../../../../../app/domain/customer/customerId.js';
import { Price } from '../../../../../app/domain/product/price.js';
import { ProductId } from '../../../../../app/domain/product/productId.js';

const customerIdSchema = CustomerId.schema.openapi({
  example: '01KAN6MY2AJFPVGQATAS6CK9XX',
  description: '顧客ID (ULID)',
});

const productIdSchema = ProductId.schema.openapi({
  example: '01KAN6MY2AJFPVGQATAS6CK9XX',
  description: '商品ID (ULID)',
});

const quantitySchema = Quantity.schema.openapi({
  example: 2,
  description: '数量',
});

const CartIdParamSchema = z
  .object({
    cartId: customerIdSchema,
  })
  .openapi('CartIdParam');

const RemoveCartItemParamsSchema = z
  .object({
    cartId: customerIdSchema,
    productId: productIdSchema,
  })
  .openapi('RemoveCartItemParamsSchema');

const CartItemSchema = z
  .object({
    productId: productIdSchema,
    price: Price.schema.openapi({
      example: 2_000,
      description: '価格 (円)',
    }),
    quantity: quantitySchema,
  })
  .readonly()
  .openapi('CartItem');

const GetCartResponseSchema = z.array(CartItemSchema).readonly();

const AddCartItemRequestSchema = z.object({
  cartId: customerIdSchema,
  productId: productIdSchema,
  quantity: quantitySchema,
});

const AddCartItemResponseSchema = z.object({
  eventName: z.union([
    z.literal(CartItemAdded.eventName),
    z.literal(CartItemUpdated.eventName),
  ]),
  item: CartItemSchema,
});

export {
  CartIdParamSchema,
  RemoveCartItemParamsSchema,
  GetCartResponseSchema,
  AddCartItemRequestSchema,
  AddCartItemResponseSchema,
};
