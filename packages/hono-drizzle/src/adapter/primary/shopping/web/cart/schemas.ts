import { z } from 'zod';

import { CartItemAdded, CartItemUpdated } from '#/app/domain/cart/cartEvent.js';
import { CartItem } from '#/app/domain/cart/cartItem.js';
import { Quantity } from '#/app/domain/cart/quantity.js';
import { CustomerId } from '#/app/domain/customer/customerId.js';
import { ProductId } from '#/app/domain/product/productId.js';

const GetCartParamSchema = z.object({
  cartId: CustomerId.schema,
});

const GetCartResponseSchema = z.array(CartItem.schema).readonly();

const AddCartItemRequestSchema = z.object({
  cartId: CustomerId.schema,
  productId: ProductId.schema,
  quantity: Quantity.schema,
});

const AddCartItemResponseSchema = z.object({
  eventName: z.union([
    z.literal(CartItemAdded.eventName),
    z.literal(CartItemUpdated.eventName),
  ]),
  item: CartItem.schema,
});

const RemoveCartItemParamsSchema = z.object({
  cartId: CustomerId.schema,
  productId: ProductId.schema,
});

const ClearCartParamSchema = z.object({
  cartId: CustomerId.schema,
});

export {
  GetCartParamSchema,
  GetCartResponseSchema,
  AddCartItemRequestSchema,
  AddCartItemResponseSchema,
  RemoveCartItemParamsSchema,
  ClearCartParamSchema,
};
