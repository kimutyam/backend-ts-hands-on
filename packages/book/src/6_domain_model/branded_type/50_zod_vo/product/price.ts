import type { Eq } from '6_domain_model/branded_type/50_zod_vo/eq.js';
import { fromZodReturnTypeDefault } from '6_domain_model/branded_type/50_zod_vo/resultBuilder.js';
import type { Result } from 'neverthrow';
import { z } from 'zod';

export declare const ProductPriceBrand: unique symbol;

const schema = z
  .number()
  .int()
  .min(100)
  .max(1_000_000)
  .brand('ProductPrice');

export type Price = z.infer<typeof schema>;

export type PriceInput = z.input<typeof schema>;

const build = (a: PriceInput): Price => schema.parse(a);
const safeBuild = (
  a: PriceInput,
): Result<Price, z.ZodError<PriceInput>> =>
  fromZodReturnTypeDefault(schema.safeParse(a));

const equals: Eq<Price> = (x: Price, y: Price): boolean =>
  x === y;

export const Price = {
  build,
  safeBuild,
  equals,
  schema,
} as const;
