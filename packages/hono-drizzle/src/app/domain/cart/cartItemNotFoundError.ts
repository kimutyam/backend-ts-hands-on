import type { ApplicationError } from '../../util/applicationError.js';
import type { CustomerId } from '../customer/customerId.js';
import type { ProductId } from '../product/productId.js';

const kind = 'CartItemNotFoundError';
interface CartItemNotFoundError extends ApplicationError<typeof kind> {
  readonly customerId: CustomerId;
  readonly productId: ProductId;
}

const create = (
  customerId: CustomerId,
  productId: ProductId,
): CartItemNotFoundError => ({
  kind,
  message: `カート項目が見つかりませんでした: ${customerId}`,
  customerId,
  productId,
});

const CartItemNotFoundError = {
  kind,
  create,
} as const;

export { CartItemNotFoundError };
