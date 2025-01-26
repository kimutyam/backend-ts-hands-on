import type { Cart } from '../1/cart.js';
import type { CartNotFoundError } from '../1/cartNotFoundError.js';
import type { DeleteById, FindById, Save } from './repository.js';

type FindCartById = FindById<Cart, CartNotFoundError>;

type SaveCart = Save<Cart>;

type DeleteCartById = DeleteById<Cart>;

export type { FindCartById, SaveCart, DeleteCartById };
