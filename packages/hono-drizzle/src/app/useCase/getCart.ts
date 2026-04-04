import { Cart } from '#/app/domain/cart/cart.js';
import type { GetCart } from '#/app/port/primary/shopping/getCart.js';
import { FindCartById } from '#/app/port/secondary/persistence/cartRepository.js';

const create =
  (findCartById: FindCartById): GetCart =>
  (customerId) =>
    findCartById(customerId).unwrapOr(Cart.init(customerId));

create.inject = [FindCartById.token] as const;

const GetCartUseCase = {
  create,
} as const;

export { GetCartUseCase };
