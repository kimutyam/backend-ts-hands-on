import type { Cart } from '../ex1/cart.js';
import type { CartNotFoundError } from '../ex1/cartNotFoundError.js';
import type { DeleteById, FindById, Store } from './repository.js';

type FindCartById = FindById<Cart, CartNotFoundError>;

type StoreCart = Store<Cart>;

type DeleteCartById = DeleteById<Cart>;

export type { DeleteCartById, FindCartById, StoreCart };
