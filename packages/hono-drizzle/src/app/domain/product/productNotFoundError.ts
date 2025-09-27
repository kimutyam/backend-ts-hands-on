import type { ApplicationError } from '../../util/applicationError.js';
import type { ProductId } from './productId.js';

const kind = 'ProductNotFound';

interface ProductNotFoundError extends ApplicationError<typeof kind> {
  readonly productId: ProductId;
}

const create = (productId: ProductId): ProductNotFoundError => ({
  kind,
  message: `商品ID: ${productId} の商品が見つかりませんでした`,
  productId,
});

const ProductNotFoundError = {
  create,
} as const;

export { ProductNotFoundError };
