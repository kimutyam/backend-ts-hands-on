import type { Result } from 'neverthrow';
import { z } from 'zod';

import { fromZodReturnTypeDefault } from '../result.js';

const schema = z.uuid().brand('ProductId');

export type ProductId = z.infer<typeof schema>;

export type ProductIdInput = z.input<typeof schema>;

const build = (input: ProductIdInput): ProductId => schema.parse(input);

const safeBuild = (
  input: ProductIdInput,
): Result<ProductId, z.ZodError<ProductId>> =>
  fromZodReturnTypeDefault(schema.safeParse(input));

export const ProductId = {
  build,
  safeBuild,
  schema,
} as const;
