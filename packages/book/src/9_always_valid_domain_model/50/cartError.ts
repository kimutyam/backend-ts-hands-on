import type { Cart, CartZodError } from './cart.js';
import type { Price, PriceZodError } from './price.js';
import type {
  Quantity,
  QuantityZodError,
} from './quantity.js';

interface CartErrorLike<S extends string> {
  readonly kind: S;
}

interface QuantityRefinementsError
  extends CartErrorLike<typeof Quantity.name> {
  error: QuantityZodError;
}

interface PriceRefinementsError
  extends CartErrorLike<typeof Price.name> {
  error: PriceZodError;
}

interface CartRefinementsError
  extends CartErrorLike<typeof Cart.name> {
  error: CartZodError;
}

type AddCartError =
  | QuantityRefinementsError
  | CartRefinementsError;

export type {
  AddCartError,
  QuantityRefinementsError,
  PriceRefinementsError,
  CartRefinementsError,
};
