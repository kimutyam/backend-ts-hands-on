import type { Cart } from '9_always_valid_domain_model/50/cart.js';
import type { CartNotFoundError } from '9_always_valid_domain_model/50/cartNotFoundError.js';
import type { FindById } from '9_always_valid_domain_model/50/repository.js';

type FindCartById = FindById<Cart, CartNotFoundError>;

export type { FindCartById };
