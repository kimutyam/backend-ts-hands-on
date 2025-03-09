import type { Cart } from '8_domain_event/1/cart.js';
import type { CartNotFoundError } from '8_domain_event/1/cartNotFoundError.js';
import type { FindById } from '8_domain_event/1/repository.js';

type FindCartById = FindById<Cart, CartNotFoundError>;

export type { FindCartById };
