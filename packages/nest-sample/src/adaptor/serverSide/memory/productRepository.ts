import type { Product, ProductId } from '../../../domain/product';
import type { IProductRepository } from '../../../domain/productRepository';

export class ProductRepository implements IProductRepository {
  private readonly aggregates: Record<ProductId, Product> = {};

  findById(id: ProductId): Promise<Product | undefined> {
    return Promise.resolve(this.aggregates[id]);
  }

  save(product: Product): Promise<void> {
    this.aggregates[product.productId] = product;
    return Promise.resolve();
  }
}
