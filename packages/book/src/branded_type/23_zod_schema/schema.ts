import { z } from 'zod';

const nameSchema = z.string();

export const productSchema = z.object({
  name: nameSchema,
  price: z.number(),
});
