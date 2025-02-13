import type { Result } from 'neverthrow';
import { z } from 'zod';
import type { Eq } from '../../util/eq.js';
import { buildFromZodDefault } from '../../util/result.js';

export declare const PriceBrand: unique symbol;

const schema = z.number().int().min(100).max(10_000).brand(PriceBrand);

export type Price = z.infer<typeof schema>;

export type PriceInput = z.input<typeof schema>;

export type PriceError = z.ZodError<PriceInput>;

const build = (a: PriceInput): Price => schema.parse(a);
const safeBuild = (a: PriceInput): Result<Price, PriceError> =>
  buildFromZodDefault(schema.safeParse(a));

const equals: Eq<Price> = (x: Price, y: Price): boolean => x === y;

export const Price = {
  schema,
  equals,
  build,
  safeBuild,
} as const;
