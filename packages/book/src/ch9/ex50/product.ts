import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import { Aggregate } from './aggregate.js';
import { Price } from './price.js';
import { ProductId } from './productId.js';
import { ProductRefinementsError } from './productRefinementsError.js';
import { createFromZod } from './result.js';

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
type ProductZodError = z.ZodError<Input>;

const parse = (value: Input): Product => schema.parse(value);

const safeParse = (value: Input): Result<Product, ProductRefinementsError> =>
  R.pipe(
    schema.safeParse(value),
    createFromZod(ProductRefinementsError.create),
  );

const Product = {
  aggregateName,
  schema,
  parse,
  safeParse,
} as const;

export { Product, type ProductZodError };
