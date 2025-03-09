import { z } from 'zod';

export const productSchema = z.object({
  id: z.string(),
  price: z.number(),
});

export const orderItemSchema = z.object({
  product: productSchema,
  quantity: z.number(),
});

// type Product = {
//   id: string,
//   price: number
// }
export type Product = z.infer<typeof productSchema>;

// type OrderType = {
//   product: {id: string, price: number},
//   quantity: number
// }
export type OrderItem = z.infer<typeof orderItemSchema>;
