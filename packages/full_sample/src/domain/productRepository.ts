import type { Product, ProductId } from './product';

export interface IProductRepository {
  findById(id: ProductId): Promise<Product | undefined>;

  save(product: Product): Promise<void>;
}

export const IProductRepository = {
  token: 'IProductRepository',
} as const;
