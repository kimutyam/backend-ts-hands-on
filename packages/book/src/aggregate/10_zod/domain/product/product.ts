import { Aggregate } from 'aggregate/10_zod/domain/aggregate.js';
import { Price } from 'aggregate/10_zod/domain/price/price.js';
import { ProductId } from 'aggregate/10_zod/domain/product/productId.js';
import type { Eq } from 'aggregate/10_zod/util/eq.js';
import * as z from 'zod';

const aggregateName = 'product' as const;

const schema = Aggregate.makeSchema(
  ProductId.schema,
  z
    .object({
      name: z.string(),
      price: Price.schema,
    })
    .readonly(),
);

export type Product = z.infer<typeof schema>;

const isSameIdentity: Eq<Product> = (
  x: Product,
  y: Product,
): boolean =>
  ProductId.equals(x.aggregateId, y.aggregateId);

const changePrice =
  (price: Price) =>
  (product: Product): Product => ({
    ...product,
    props: { ...product.props, price },
  });

export const Product = {
  aggregateName,
  changePrice,
  isSameIdentity,
  schema,
} as const;
