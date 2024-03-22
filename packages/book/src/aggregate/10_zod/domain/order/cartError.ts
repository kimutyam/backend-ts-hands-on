import type * as z from 'zod';
import type { CartInput } from './cart';
import type { OrderQuantityInput } from './orderQuantity';

export type AddProductError = z.ZodError<CartInput> | z.ZodError<OrderQuantityInput>;
