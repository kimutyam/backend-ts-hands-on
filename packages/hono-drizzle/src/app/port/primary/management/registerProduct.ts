import type { Price } from '../../../domain/product/price.js';
import type { ProductRegistered } from '../../../domain/product/productEvent.js';
import { ResultAsync } from 'neverthrow';
import { ProductNameDuplicatedError } from '../../../domain/product/productNameDuplicatedError.js';

type RegisterProduct = (
  name: string,
  price: Price,
) => ResultAsync<ProductRegistered, ProductNameDuplicatedError | undefined>;

const RegisterProduct = {
  token: 'RegisterProduct' as const,
} as const;

export { RegisterProduct };
