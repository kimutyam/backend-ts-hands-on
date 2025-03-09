import { z } from 'zod';

const nameSchema = z.string().brand('Name');
const priceSchema = z.number().brand('Price');
const productSchema = z
  .object({
    name: nameSchema,
    price: priceSchema,
  })
  .brand('Product');

// string & z.BRAND<"name">
type Name = z.infer<typeof nameSchema>;
// number &  z.BRAND<"Price">
type Price = z.infer<typeof priceSchema>;
// {name: string & z.BRAND<"name">, price: number &  z.BRAND<"Price"> } & z.BRAND<"product">
type Product = z.infer<typeof productSchema>;

export { nameSchema, priceSchema, productSchema };
export type { Name, Price, Product };
