import type { Cart } from '../1/cart';
import type { CartNotFoundError } from '../1/cartNotFoundError';
import type { FindById, Save, DeleteById } from './repository';

type FindCartById = FindById<Cart, CartNotFoundError>;

type SaveCart = Save<Cart>;

type DeleteCartById = DeleteById<Cart>;

export type { FindCartById, SaveCart, DeleteCartById };
