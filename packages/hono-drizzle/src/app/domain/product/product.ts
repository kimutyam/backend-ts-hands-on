import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import type { ApplicationError } from '../../util/applicationError.js';
import { createWithErrorFromZod } from '../../util/result.js';
import { Aggregate } from '../aggregate.js';
import { DomainEvent } from '../domainEvent.js';
import { Price } from './price.js';
import { ProductRegistered } from './productEvent.js';
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

const register = (aggregate: Product): [Product, ProductRegistered] => {
  const event = R.pipe(
    aggregate,
    DomainEvent.generate(aggregateName, ProductRegistered.eventName, {
      product: aggregate,
    }),
  );
  return [aggregate, event];
};

const init = (
  aggregateId: ProductId,
  name: string,
  price: Price,
): Result<Product, ProductRefinementsError> => {
  const sequenceNumber = Aggregate.InitialSequenceNumber;
  return safeParse({ aggregateId, sequenceNumber, name, price });
};

const Product = {
  aggregateName,
  schema,
  parse,
  safeParse,
  init,
  register,
} as const;

export { Product, ProductRefinementsError };
