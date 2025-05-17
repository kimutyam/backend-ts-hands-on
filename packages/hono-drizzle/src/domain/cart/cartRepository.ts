import type { FindById } from '../repository.js';
import type { Cart } from './cart.js';
import type { CartNotFoundError } from './cartNotFoundError.js';

type FindCartById = FindById<Cart, CartNotFoundError>;

export type { FindCartById };
