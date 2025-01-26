import * as z from 'zod';
import type { Eq } from '../../util/eq.js';
import { Aggregate } from '../aggregate.js';
import { Price } from '../price/price.js';
import { ProductId } from './productId.js';

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

const isSameIdentity: Eq<Product> = (x: Product, y: Product): boolean =>
  ProductId.equals(x.aggregateId, y.aggregateId);

const changePrice =
  (price: Price) =>
  (product: Product): Product => ({ ...product, props: { ...product.props, price } });

export const Product = {
  aggregateName,
  changePrice,
  isSameIdentity,
  schema,
} as const;
