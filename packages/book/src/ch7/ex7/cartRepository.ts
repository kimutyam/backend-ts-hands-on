import type { Cart } from 'ch7/ex1/cart.js';
import type { CartNotFoundError } from 'ch7/ex1/cartNotFoundError.js';
import type { DeleteById, FindById, Store } from 'ch7/ex7/repository.js';

type FindCartById = FindById<Cart, CartNotFoundError>;

type StoreCart = Store<Cart>;

type DeleteCartById = DeleteById<Cart>;

export type { DeleteCartById, FindCartById, StoreCart };
