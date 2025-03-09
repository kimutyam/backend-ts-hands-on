import type { CartInput } from 'aggregate/10_zod/domain/cart/cart.js';
import type { QuantityInput } from 'aggregate/10_zod/domain/item/quantity.js';
import type * as z from 'zod';

export type AddProductError =
  | z.ZodError<CartInput>
  | z.ZodError<QuantityInput>;
