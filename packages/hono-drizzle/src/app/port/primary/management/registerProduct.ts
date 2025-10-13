import type { ResultAsync } from 'neverthrow';

import type { Price } from '../../../domain/product/price.js';
import type { ProductRefinementsError } from '../../../domain/product/product.js';
import type { ProductRegistered } from '../../../domain/product/productEvent.js';
import type { ProductName } from '../../../domain/product/productName.js';
import type { ProductNameDuplicatedError } from '../../../domain/product/productNameDuplicatedError.js';

type RegisterProduct = (
  name: ProductName,
  price: Price,
) => ResultAsync<
  ProductRegistered,
  ProductNameDuplicatedError | ProductRefinementsError
>;

const RegisterProduct = {
  token: 'RegisterProduct' as const,
} as const;

export { RegisterProduct };
