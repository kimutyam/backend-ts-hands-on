import { ulid } from 'ulidx';
import { Price } from './price';
import type { Product } from './product';
import type { ProductRepository } from './productRepository';

interface CreateProductRequest {
  readonly price: number;
}

const validateCreateProductRequest = (request: CreateProductRequest): ReadonlyArray<string> => {
  const errors: Array<string> = [];

  if (!Number.isInteger(request.price)) {
    errors.push('price must be integer');
  }

  if (request.price <= 0) {
    errors.push('price must be greater than 0');
  }

  // このユースケースでは1万円を超える価格を登録できない (不変条件は10万円以下)
  if (request.price >= 10_000) {
    errors.push('price must be less than 10,000');
  }

  return errors;
};

const createProduct =
  (repository: ProductRepository) =>
  async (request: CreateProductRequest): Promise<void> => {
    const errors = validateCreateProductRequest(request);
    if (errors.length > 0) {
      throw new Error(errors.join(','));
    }

    const product: Product = {
      productId: ulid(),
      price: Price.build(request.price),
    };
    await repository.save(product);
  };

export { createProduct, type CreateProductRequest };
