import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import { buildFromZodDefault } from '../../util/result.js';
import { Aggregate } from '../aggregate.js';
import { Price } from './price.js';
import { ProductId } from './productId.js';

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

const parse = (value: Input): Product => schema.parse(value);

const safeParse = (value: Input): Result<Product, ProductError> =>
  R.pipe(schema.safeParse(value), buildFromZodDefault);

const Product = {
  aggregateName,
  schema,
  parse,
  safeParse,
} as const;

export { Product };
