import { Aggregate } from 'ch9/ex50/aggregate.js';
import type { ApplicationError } from 'ch9/ex50/applicationError.js';
import { Price } from 'ch9/ex50/price.js';
import { ProductId } from 'ch9/ex50/productId.js';
import { createWithErrorFromZod } from 'ch9/ex50/result.js';
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
type ProductZodError = z.ZodError<Input>;

const errorKind = 'ProductRefinementsError';

interface ProductRefinementsError extends ApplicationError<typeof errorKind> {
  error: ProductZodError;
}

const createError = (error: ProductZodError): ProductRefinementsError => ({
  kind: errorKind,
  message: error.message,
  error,
});

const ProductRefinementsError = {
  kind: errorKind,
  create: createError,
} as const;

const parse = (value: Input): Product => schema.parse(value);

const safeParse = (value: Input): Result<Product, ProductRefinementsError> =>
  R.pipe(schema.safeParse(value), createWithErrorFromZod(createError));

const Product = {
  aggregateName,
  schema,
  parse,
  safeParse,
} as const;

export { Product, ProductRefinementsError };
