import type { Product } from '../../../domain/product/product.js';
import type { ProductNotFoundError } from '../../../domain/product/productNotFoundError.js';
import type { FindById } from './repository.js';

type FindProductById = FindById<Product, ProductNotFoundError>;

const FindProductById = {
  token: 'FindProductById',
} as const;

export { FindProductById };
