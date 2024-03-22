import type { Result } from 'neverthrow';
import { z } from 'zod';
import { fromZodReturnTypeDefault } from '../../../../branded_type/50_zod_vo/resultBuilder';
import type { Eq } from '../eq';

export declare const PriceBrand: unique symbol;

const schema = z.number().int().min(100).max(10_000).brand(PriceBrand);

export type Price = z.infer<typeof schema>;

export type PriceInput = z.input<typeof schema>;

const build = (a: PriceInput): Price => schema.parse(a);
const safeBuild = (a: PriceInput): Result<Price, z.ZodError<PriceInput>> =>
  fromZodReturnTypeDefault(schema.safeParse(a));

const equals: Eq<Price> = (x: Price, y: Price): boolean => x === y;

export const Price = {
  schema,
  equals,
  build,
  safeBuild,
} as const;
