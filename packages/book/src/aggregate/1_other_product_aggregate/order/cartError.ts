import type { CartLimitError } from './cartLimitError';
import type { OrderQuantityError } from './orderQuantityError';
import type { TotalPriceLimitError } from './totalPriceLimitError';
import type { TotalQuantityLimitError } from './totalQuantityLimitError';

export type CartError =
  | CartLimitError
  | TotalPriceLimitError
  | TotalQuantityLimitError
  | OrderQuantityError;
