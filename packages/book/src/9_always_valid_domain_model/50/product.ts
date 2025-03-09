import { Aggregate } from '9_always_valid_domain_model/50/aggregate.js';
import { Price } from '9_always_valid_domain_model/50/price.js';
import { ProductId } from '9_always_valid_domain_model/50/productId.js';
import { buildFromZodDefault } from '9_always_valid_domain_model/50/result.js';
import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

const aggregateName = 'Product';

const schema = Aggregate.makeBrandedSchema(
  ProductId.schema,
  z.object({
    name: z.string(),
    price: Price.schema,
  }),
  aggregateName,
);

type Input = z.input<typeof schema>;
type Product = z.infer<typeof schema>;
type ProductError = z.ZodError<Input>;

const build = (value: Input): Product =>
  schema.parse(value);

const safeBuild = (
  value: Input,
): Result<Product, ProductError> =>
  R.pipe(schema.safeParse(value), buildFromZodDefault);

const Product = {
  aggregateName,
  schema,
  build,
  safeBuild,
} as const;

export { Product };
