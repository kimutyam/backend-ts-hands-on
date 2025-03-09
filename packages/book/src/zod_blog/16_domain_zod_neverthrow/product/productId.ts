import type { Result } from 'neverthrow';
import { z } from 'zod';
import { buildFromZodDefault } from 'zod_blog/16_domain_zod_neverthrow/result.js';

const schema = z.string().uuid().brand('ProductId');

export type ProductId = z.infer<typeof schema>;

export type ProductIdInput = z.input<typeof schema>;

const build = (input: ProductIdInput): ProductId =>
  schema.parse(input);
const safeBuild = (
  input: ProductIdInput,
): Result<ProductId, z.ZodError<ProductIdInput>> =>
  buildFromZodDefault(schema.safeParse(input));

export const ProductId = {
  build,
  safeBuild,
  schema,
} as const;
