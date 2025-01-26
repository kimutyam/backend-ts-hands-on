import type * as z from 'zod';
import type { QuantityInput } from '../item/quantity.js';
import type { CartInput } from './cart.js';

export type AddProductError = z.ZodError<CartInput> | z.ZodError<QuantityInput>;
