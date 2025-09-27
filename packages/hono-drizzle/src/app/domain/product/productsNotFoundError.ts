import type { ApplicationError } from '../../util/applicationError.js';
import type { ProductId } from './productId.js';

const kind = 'ProductsNotFound';

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
