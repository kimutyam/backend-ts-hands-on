import type { ResultAsync } from 'neverthrow';

import type { Price } from '../../../domain/product/price.js';
import type { ProductRegistered } from '../../../domain/product/productEvent.js';
import type { ProductNameDuplicatedError } from '../../../domain/product/productNameDuplicatedError.js';

type RegisterProduct = (
  name: string,
  price: Price,
) => ResultAsync<ProductRegistered, ProductNameDuplicatedError>;

const RegisterProduct = {
  token: 'RegisterProduct' as const,
} as const;

export { RegisterProduct };
