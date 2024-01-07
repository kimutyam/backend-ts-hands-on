import { z } from 'zod';

export declare const PriceBrand: unique symbol;
export const priceSchema = z.number().brand(PriceBrand);
export type Price = z.infer<typeof priceSchema>;
