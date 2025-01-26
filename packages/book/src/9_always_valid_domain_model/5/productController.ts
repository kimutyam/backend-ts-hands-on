import type { Result } from 'neverthrow';
import { ResultAsync } from 'neverthrow';
import { ulid } from 'ulidx';
import { Price } from './price.js';
import type { Product } from './product.js';
import type { ProductRepository } from './productRepository.js';

interface CreateProductRequest {
  readonly price: number;
}

const validateCreateProductRequest = (
  request: CreateProductRequest,
): Result<Price, ReadonlyArray<string>> => {
  const errors: Array<string> = [];

  // このユースケースでは1万円を超える価格を登録できない (不変条件は10万円以下)
  if (request.price >= 10_000) {
    errors.push('price must be less than 10,000');
  }

  return Price.safeBuild(request.price).mapErr((e) => [...errors, ...e]);
};

const createProduct =
  (repository: ProductRepository) =>
  (request: CreateProductRequest): ResultAsync<Product, ReadonlyArray<string>> =>
    validateCreateProductRequest(request)
      .map((price) => ({
        productId: ulid(),
        price,
      }))
      .asyncAndThen((product) =>
        ResultAsync.fromSafePromise(repository.save(product)).map(() => product),
      );

export { createProduct, type CreateProductRequest };
