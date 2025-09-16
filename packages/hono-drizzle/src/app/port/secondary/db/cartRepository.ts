import type { Cart } from '../../../domain/cart/cart.js';
import type { CartNotFoundError } from '../../../domain/cart/cartNotFoundError.js';
import type { FindById } from './repository.js';

type FindCartById = FindById<Cart, CartNotFoundError>;

const FindCartById = {
  token: 'FindCartById' as const,
} as const;

export { FindCartById };
