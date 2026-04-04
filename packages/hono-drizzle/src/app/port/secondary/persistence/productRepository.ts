import type { Product } from '#/app/domain/product/product.js';
import type { ProductNotFoundError } from '#/app/domain/product/productNotFoundError.js';
import type { FindById } from '#/app/port/secondary/persistence/repository.js';

type FindProductById = FindById<Product, ProductNotFoundError>;

const FindProductById = {
  token: 'FindProductById',
} as const;

export { FindProductById };
