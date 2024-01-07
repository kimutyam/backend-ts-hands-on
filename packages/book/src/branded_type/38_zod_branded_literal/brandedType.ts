import { z } from 'zod';

export const nameSchema = z.string().brand('Name');
export const priceSchema = z.number().brand('Price');
export const productSchema = z
  .object({
    name: nameSchema,
    price: priceSchema,
  })
  .brand('Product');

export type Name = z.infer<typeof nameSchema>; // string & z.BRAND<"name">
export type Price = z.infer<typeof priceSchema>; // number &  z.BRAND<"Price">
export type Product = z.infer<typeof productSchema>; // {name: string & z.BRAND<"name">, price: number &  z.BRAND<"Price"> } & z.BRAND<"product">
