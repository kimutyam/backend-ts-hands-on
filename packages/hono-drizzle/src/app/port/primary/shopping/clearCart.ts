import type { ResultAsync } from 'neverthrow';

import type { CartCleared } from '../../../domain/cart/cartEvent.js';
import type { CartNotFoundError } from '../../../domain/cart/cartNotFoundError.js';
import type { CustomerId } from '../../../domain/customer/customerId.js';

type ClearCart = (
  customerId: CustomerId,
) => ResultAsync<CartCleared, CartNotFoundError>;

const ClearCart = {
  token: 'ClearCart',
} as const;

export { ClearCart };
