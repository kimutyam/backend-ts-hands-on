import type { Cart } from '7_aggregate/1/cart.js';
import type { CartNotFoundError } from '7_aggregate/1/cartNotFoundError.js';
import type {
  DeleteById,
  FindById,
  Save,
} from '7_aggregate/7_base_repository/repository.js';

type FindCartById = FindById<Cart, CartNotFoundError>;

type SaveCart = Save<Cart>;

type DeleteCartById = DeleteById<Cart>;

export type { FindCartById, SaveCart, DeleteCartById };
