import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import { buildFromZodDefault } from '../../util/result.js';
import { Aggregate } from '../aggregate.js';
import { DomainEvent } from '../domainEvent.js';
import { Price } from './price.js';
import { ProductRegistered } from './productEvent.js';
import { ProductId } from './productId.js';

const AGGREGATE_NAME = 'Product';

const schema = Aggregate.makeBrandedSchema(
  ProductId.schema,
  z.object({
    name: z.string(),
    price: Price.schema,
  }),
  AGGREGATE_NAME,
);

type Input = z.input<typeof schema>;
type Product = z.infer<typeof schema>;
type ProductError = z.ZodError<Input>;

const parse = (value: Input): Product => schema.parse(value);

const safeParse = (value: Input): Result<Product, ProductError> =>
  R.pipe(schema.safeParse(value), buildFromZodDefault);

const register = (aggregate: Product): ProductRegistered =>
  R.pipe(
    aggregate,
    DomainEvent.generate(AGGREGATE_NAME, ProductRegistered.eventName, {
      product: aggregate,
    }),
  );

const init = (aggregateId: ProductId, name: string, price: Price): Product => {
  const sequenceNumber = Aggregate.InitialSequenceNumber;
  return parse({ aggregateId, sequenceNumber, name, price });
};

const Product = {
  name: AGGREGATE_NAME,
  schema,
  parse,
  safeParse,
  init,
  register,
} as const;

export { Product };
