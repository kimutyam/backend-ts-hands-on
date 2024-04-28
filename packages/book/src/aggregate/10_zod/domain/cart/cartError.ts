import type * as z from 'zod';
import type { CartInput } from './cart';
import type { QuantityInput } from './quantity';

export type AddProductError = z.ZodError<CartInput> | z.ZodError<QuantityInput>;
