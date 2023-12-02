import type { ProductId } from '../90_entity_id/productId';
import type { Price } from './price';

export type Product = Readonly<{
  id: ProductId;
  name: string;
  price: Price;
}>;
