import type { Cart } from 'ch9/ex50/cart.js';
import type { CartNotFoundError } from 'ch9/ex50/cartNotFoundError.js';
import type { FindById } from 'ch9/ex50/repository.js';

type FindCartById = FindById<Cart, CartNotFoundError>;

export type { FindCartById };
