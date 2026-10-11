import type { Cart } from '#/app/domain/cart/cart.js';
import type { CartNotFoundError } from '#/app/domain/cart/cartNotFoundError.js';
import type { FindById } from '#/app/port/secondary/persistence/repository.js';

type FindCartById = FindById<Cart, CartNotFoundError>;

const FindCartById = {
  token: 'FindCartById',
} as const;

export { FindCartById };
