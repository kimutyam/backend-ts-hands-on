import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import type { ApplicationError } from '../../util/applicationError.js';
import { createWithErrorFromZod } from '../../util/result.js';

const name = 'ProductName';

const schema = z.string().min(1).max(100).brand(name);

type ProductName = z.infer<typeof schema>;
type ProductNameInput = z.input<typeof schema>;

const errorKind = 'PriceRefinementsError';

type ProductNameZodError = z.ZodError<ProductNameInput>;
interface ProductNameRefinementsError
  extends ApplicationError<typeof errorKind> {
  error: ProductNameZodError;
}

const createError = (
  error: ProductNameZodError,
): ProductNameRefinementsError => ({
  kind: errorKind,
  message: error.message,
  error,
});

const ProductNameRefinementsError = {
  kind: errorKind,
  creata: createError,
} as const;

const parse = (value: ProductNameInput): ProductName => schema.parse(value);
const safeParse = (
  value: ProductNameInput,
): Result<ProductName, ProductNameRefinementsError> =>
  R.pipe(schema.safeParse(value), createWithErrorFromZod(createError));

const ProductName = {
  name,
  schema,
  parse,
  safeParse,
} as const;

export { ProductName, ProductNameRefinementsError };
