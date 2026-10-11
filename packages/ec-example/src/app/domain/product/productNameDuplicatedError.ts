import type { ProductId } from '#/app/domain/product/productId.js';
import type { ProductName } from '#/app/domain/product/productName.js';
import type { ApplicationError } from '#/app/util/applicationError.js';

const kind = 'ProductNameDuplicatedError';

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
