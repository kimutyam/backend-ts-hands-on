import type { ResultAsync } from 'neverthrow';
import type { Product } from '../../10_zod/domain/product/product';
import type { ProductId } from '../../10_zod/domain/product/productId';
import type { ProductNotFoundError } from '../../10_zod/domain/product/productNotFoundError';

export interface IProductRespository {
  findById(aggregateId: ProductId): ResultAsync<Product, ProductNotFoundError>;

  findAll(): Promise<ReadonlyArray<Product>>;

  save(product: Product): Promise<void>;
  deleteById(aggregateId: ProductId): Promise<void>;
}
