import { eq } from 'drizzle-orm';
import type { Result } from 'neverthrow';
import { err, ok, ResultAsync } from 'neverthrow';

import { Cart } from '../../../../app/domain/cart/cart.js';
import { CartItem } from '../../../../app/domain/cart/cartItem.js';
import { CartNotFoundError } from '../../../../app/domain/cart/cartNotFoundError.js';
import type { CustomerId } from '../../../../app/domain/customer/customerId.js';
import type { FindCartById } from '../../../../app/port/secondary/persistence/cartRepository.js';
import { Db } from './db.js';
import { cartTable } from './schema/cart.sql.js';
import { cartItemTable } from './schema/cartItem.sql.js';

type CartSelect = typeof cartTable.$inferSelect;
type CartItemSelect = typeof cartItemTable.$inferSelect;

interface Select {
  cart: CartSelect;
  cart_item: CartItemSelect | null;
}

const toCartItem = (select: CartItemSelect): CartItem => {
  const { productId, price, quantity } = select;
  return CartItem.parse({ productId, price, quantity });
};

const toCart =
  (aggregateId: CustomerId) =>
  (selects: ReadonlyArray<Select>): Result<Cart, CartNotFoundError> => {
    if (selects.length === 0) {
      return err(CartNotFoundError.create(aggregateId));
    }

    const { sequenceNumber } = selects[0]!.cart;

    const cartItems = selects.reduce<Array<CartItem>>((acc, { cart_item }) => {
      if (cart_item === null) {
        return acc;
      }
      return [...acc, toCartItem(cart_item)];
    }, []);

    return ok(
      Cart.parse({
        aggregateId,
        sequenceNumber,
        cartItems,
      }),
    );
  };

const createFindByIdFn =
  (db: Db): FindCartById =>
  (aggregateId) =>
    ResultAsync.fromSafePromise(
      db
        .select()
        .from(cartTable)
        .leftJoin(
          cartItemTable,
          eq(cartTable.customerId, cartItemTable.customerId),
        )
        .where(eq(cartTable.customerId, aggregateId)),
    ).andThen(toCart(aggregateId));

createFindByIdFn.inject = [Db.token] as const;

const CartRepository = {
  createFindByIdFn,
} as const;

export { CartRepository };
