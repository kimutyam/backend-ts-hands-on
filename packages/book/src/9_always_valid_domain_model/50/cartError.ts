import type {
  Cart,
  CartZodError,
} from '9_always_valid_domain_model/50/cart.js';
import type {
  Price,
  PriceZodError,
} from '9_always_valid_domain_model/50/price.js';
import type {
  Quantity,
  QuantityZodError,
} from '9_always_valid_domain_model/50/quantity.js';

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
