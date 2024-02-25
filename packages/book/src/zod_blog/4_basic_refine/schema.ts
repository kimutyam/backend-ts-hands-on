import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().uuid(),
  price: z.number().int().min(1000).max(100_000),
});

export const orderItemSchema = z.object({
  product: productSchema,
  quantity: z.number().int().min(1).max(10),
});

export type OrderItem = z.infer<typeof orderItemSchema>;
