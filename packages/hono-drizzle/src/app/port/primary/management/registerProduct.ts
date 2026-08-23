import type { ResultAsync } from 'neverthrow';

import type { Price } from '#/app/domain/product/price.js';
import type { ProductRegistered } from '#/app/domain/product/productEvent.js';
import type { ProductInvariantViolationError } from '#/app/domain/product/productInvariantViolationError.js';
import type { ProductName } from '#/app/domain/product/productName.js';
import type { ProductNameDuplicatedError } from '#/app/domain/product/productNameDuplicatedError.js';

type RegisterProduct = (
  name: ProductName,
  price: Price,
) => ResultAsync<
  ProductRegistered,
  ProductNameDuplicatedError | ProductInvariantViolationError
>;

const RegisterProduct = {
  token: 'RegisterProduct',
} as const;

export { RegisterProduct };
