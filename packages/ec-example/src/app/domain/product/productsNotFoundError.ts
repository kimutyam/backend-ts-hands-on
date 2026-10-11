import type { ProductId } from '#/app/domain/product/productId.js';
import type { ApplicationError } from '#/app/util/applicationError.js';

const kind = 'ProductsNotFoundError';

interface ProductsNotFoundError extends ApplicationError<typeof kind> {
  readonly productIds: ReadonlyArray<ProductId>;
}

const create = (
  productIds: ReadonlyArray<ProductId>,
): ProductsNotFoundError => ({
  kind,
  message: `商品ID: ${productIds.join(', ')} の商品が見つかりませんでした`,
  productIds,
});

const ProductsNotFoundError = {
  kind,
  create,
} as const;

export { ProductsNotFoundError };
