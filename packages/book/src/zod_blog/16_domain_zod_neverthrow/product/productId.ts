import type { Result } from 'neverthrow';
import { z } from 'zod';
import { buildFromZodDefault } from '../result';

export declare const ProductIdBrand: unique symbol;

const schema = z.string().uuid().brand(ProductIdBrand);

export type ProductId = z.infer<typeof schema>;

export type ProductIdInput = z.input<typeof schema>;

const build = (input: ProductIdInput): ProductId => schema.parse(input);
const safeBuild = (input: ProductIdInput): Result<ProductId, z.ZodError<ProductIdInput>> =>
  buildFromZodDefault(schema.safeParse(input));

export const ProductId = {
  build,
  safeBuild,
  schema,
} as const;
