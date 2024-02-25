import { z } from 'zod';

export declare const ProductIdBrand: unique symbol;
export declare const PriceBrand: unique symbol;

export declare const OrderQuantityBrand: unique symbol;

export const productSchema = z.object({
  id: z.string().uuid().brand(ProductIdBrand),
  price: z.number().int().min(1000).max(100_000).brand(PriceBrand),
});

export const orderItemSchema = z.object({
  product: productSchema,
  quantity: z.number().min(1).max(10).brand(OrderQuantityBrand),
});

// type OrderItem = {
//   product: {
//     id: string & z.BRAND<typeof ProductIdBrand>;
//     price: number & z.BRAND<typeof PriceBrand>;
//   };
//   quantity: number & z.BRAND<typeof OrderQuantityBrand>;
// };
export type OrderItem = z.infer<typeof orderItemSchema>;
