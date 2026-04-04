import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import { Aggregate } from '#/app/domain/aggregate.js';
import { DomainEvent } from '#/app/domain/domainEvent.js';
import { Price } from '#/app/domain/product/price.js';
import { ProductRegistered } from '#/app/domain/product/productEvent.js';
import { ProductId } from '#/app/domain/product/productId.js';
import { ProductName } from '#/app/domain/product/productName.js';
import { ProductRefinementsError } from '#/app/domain/product/productRefinementsError.js';
import { createFromZod } from '#/app/util/result.js';

const aggregateName = 'Product';

const schema = Aggregate.makeBrandedSchema(
  ProductId.schema,
  z.object({
    name: ProductName.schema,
    price: Price.schema,
  }),
  aggregateName,
  { id: aggregateName, description: '商品' },
);

type Input = z.input<typeof schema>;
type Product = z.infer<typeof schema>;
type ProductZodError = z.ZodError<Product>;

const parse = (value: Input): Product => schema.parse(value);

const safeParse = (value: Input): Result<Product, ProductRefinementsError> =>
  R.pipe(
    schema.safeParse(value),
    createFromZod(ProductRefinementsError.create),
  );

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
  name: ProductName,
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

export { Product, type ProductZodError };
