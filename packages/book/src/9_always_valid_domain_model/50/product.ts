import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';
import { Aggregate } from './aggregate.js';
import { Price } from './price.js';
import { ProductId } from './productId.js';
import { buildFromZodDefault } from './result.js';

const aggregateName = 'Product';

const schema = Aggregate.makeBrandedSchema(
  ProductId.schema,
  z.object({
    name: z.string(),
    price: Price.schema,
  }),
  aggregateName,
);

type Input = Omit<z.input<typeof schema>, 'aggregateName'>;
type Product = z.infer<typeof schema>;
type ProductError = z.ZodError<Input>;

const build = (value: Input): Product => schema.parse(value);

const safeBuild = (value: Input): Result<Product, ProductError> =>
  R.pipe(schema.safeParse(value), buildFromZodDefault);

const Product = {
  aggregateName,
  schema,
  build,
  safeBuild,
} as const;

export { Product };
