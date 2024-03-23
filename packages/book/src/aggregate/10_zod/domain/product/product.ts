import * as z from 'zod';
import type { Eq } from '../../util/eq';
import { Price } from '../price/price';
import { ProductId } from './productId';

const schema = z
  .object({
    productId: ProductId.schema,
    name: z.string(),
    price: Price.schema,
  })
  .readonly();

export type Product = z.infer<typeof schema>;

const isSameIdentity: Eq<Product> = (x: Product, y: Product): boolean =>
  ProductId.equals(x.productId, y.productId);

const changePrice =
  (price: Price) =>
  (product: Product): Product => ({ ...product, price });

export const Product = {
  changePrice,
  isSameIdentity,
} as const;
