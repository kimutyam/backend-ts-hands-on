import { z } from 'zod';

export declare const ProductPriceBrand: unique symbol;

const schema = z
  .number()
  .int()
  .min(100)
  .max(1_000_000)
  .brand(ProductPriceBrand);

export type Price = z.infer<typeof schema>;

export type PriceInput = z.input<typeof schema>;

const build = (a: PriceInput): Price => schema.parse(a);

const safeBuild = (a: PriceInput): z.ZodSafeParseResult<Price> =>
  schema.safeParse(a);

export const Price = {
  build,
  safeBuild,
  schema,
} as const;
