import type { Price } from '../../../domain/product/price.js';
import type { ProductRegistered } from '../../../domain/product/productEvent.js';

type RegisterProduct = (
  name: string,
  price: Price,
) => Promise<ProductRegistered>;

const RegisterProduct = {
  token: 'RegisterProduct' as const,
} as const;

export { RegisterProduct };
