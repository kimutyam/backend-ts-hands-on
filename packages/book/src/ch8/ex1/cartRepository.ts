import type { Cart } from 'ch8/ex1/cart.js';
import type { CartNotFoundError } from 'ch8/ex1/cartNotFoundError.js';
import type { FindById } from 'ch8/ex1/repository.js';

type FindCartById = FindById<Cart, CartNotFoundError>;

export type { FindCartById };
