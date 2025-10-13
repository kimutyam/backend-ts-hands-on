import type { ApplicationError } from '../../util/applicationError.js';
import type { ProductId } from './productId.js';
import type { ProductName } from './productName.js';

const kind = 'ProductNameDuplicated';

interface ProductNameDuplicatedError extends ApplicationError<typeof kind> {
  readonly productId: ProductId;
  readonly productName: ProductName;
}

const create = (
  productId: ProductId,
  productName: ProductName,
): ProductNameDuplicatedError => ({
  kind,
  message: `同じ名前の商品が既に存在します: ${productName} (ID: ${productId})`,
  productId,
  productName,
});

const ProductNameDuplicatedError = {
  kind,
  create,
} as const;

export { ProductNameDuplicatedError };
