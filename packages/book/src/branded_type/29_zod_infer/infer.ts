import { z } from 'zod';

export const productSchema = z.object({
  name: z.string(),
  price: z.number(),
});

export type Product = z.infer<typeof productSchema>;
// type Product = {
//   name: string;
//   price: number;
// }
