import type { Result } from 'neverthrow';
import * as R from 'remeda';
import { z } from 'zod';

import { Aggregate } from '#/app/domain/aggregate.js';
import { DomainEvent } from '#/app/domain/domainEvent.js';
import { Price } from '#/app/domain/product/price.js';
import { ProductRegistered } from '#/app/domain/product/productEvent.js';
import { ProductId } from '#/app/domain/product/productId.js';
import { ProductInvariantViolationError } from '#/app/domain/product/productInvariantViolationError.js';
import { ProductName } from '#/app/domain/product/productName.js';
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
type Product = z.output<typeof schema>;
type ProductZodError = z.ZodError<Product>;

const parse = (value: Input): Product => schema.parse(value);

const safeParse = (
  value: Input,
): Result<Product, ProductInvariantViolationError> =>
  R.pipe(
    schema.safeParse(value),
    createFromZod(ProductInvariantViolationError.create),
  );

const register = (aggregate: Product): [Product, ProductRegistered] => {
  const event = R.pipe(
    parse({
      ...aggregate,
      sequenceNumber: Aggregate.incrementSequenceNumber(
        aggregate.sequenceNumber,
      ),
    }),
    DomainEvent.generate(aggregateName, ProductRegistered.eventName, {
      product: aggregate,
    }),
  );
  return [aggregate, event];
};

const generate = (
  name: ProductName,
  price: Price,
  generateProductId: () => ProductId,
): Result<Product, ProductInvariantViolationError> =>
  safeParse({
    aggregateId: generateProductId(),
    sequenceNumber: Aggregate.InitialSequenceNumber,
    name,
    price,
  });

const Product = {
  aggregateName,
  schema,
  parse,
  safeParse,
  generate,
  register,
} as const;

export { Product, type ProductZodError };
