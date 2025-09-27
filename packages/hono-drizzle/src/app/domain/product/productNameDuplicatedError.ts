import type { ApplicationError } from '../../util/applicationError.js';
import type { ProductId } from './productId.js';

const kind = 'ProductNameDuplicated';

interface ProductNameDuplicatedError extends ApplicationError<typeof kind> {
  readonly productId: ProductId;
  readonly productName: string;
}

const create = (
  productId: ProductId,
  productName: string,
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
