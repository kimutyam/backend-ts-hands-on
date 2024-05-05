import * as z from 'zod';
import type { Eq } from '../../util/eq';
import { Aggregate } from '../aggregate';
import { Price } from '../price/price';
import { ProductId } from './productId';

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
  changePrice,
  isSameIdentity,
} as const;
