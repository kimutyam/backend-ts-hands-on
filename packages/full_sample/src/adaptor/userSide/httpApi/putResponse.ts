import type { ProductId } from '../../../domain/product';

export type PutResponse = Readonly<{
  productId: ProductId;
  quantity: number;
}>;
