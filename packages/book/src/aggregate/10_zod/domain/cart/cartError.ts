import type * as z from 'zod';
import type { QuantityInput } from '../item/quantity';
import type { CartInput } from './cart';

export type AddProductError = z.ZodError<CartInput> | z.ZodError<QuantityInput>;
