import { z } from 'zod';

export declare const NameBrand: unique symbol;
export const nameSchema = z.string().brand(NameBrand);
export type Name = z.infer<typeof nameSchema>;
