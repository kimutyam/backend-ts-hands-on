import { z } from 'zod';

export declare const OrderQuantityBrand: unique symbol;

const schema = z.number().int().min(1).max(10).brand(OrderQuantityBrand);

export type OrderQuantity = z.infer<typeof schema>;

type Input = z.input<typeof schema>;

const build = (a: Input): OrderQuantity => schema.parse(a);
const safeBuild = (a: Input): z.SafeParseReturnType<number, OrderQuantity> => schema.safeParse(a);
export const OrderQuantity = {
  build,
  safeBuild,
  schema,
} as const;
