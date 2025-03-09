import type { CartInput } from 'chx/ex10/domain/cart/cart.js';
import type { QuantityInput } from 'chx/ex10/domain/item/quantity.js';
import type * as z from 'zod';

export type AddProductError =
  | z.ZodError<CartInput>
  | z.ZodError<QuantityInput>;
