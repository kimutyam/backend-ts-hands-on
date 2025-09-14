import { eq } from 'drizzle-orm';
import type { Result } from 'neverthrow';
import { err, ok, ResultAsync } from 'neverthrow';

import { Cart } from '../../../app/domain/cart/cart.js';
import type { CartItem } from '../../../app/domain/cart/cartItem.js';
import { CartNotFoundError } from '../../../app/domain/cart/cartNotFoundError.js';
import type { CustomerId } from '../../../app/domain/customer/customerId.js';
import type { FindCartById } from '../../../app/port/secondary/cartRepository.js';
import { Db } from './db.js';
import { cartTable } from './schema/cart.sql.js';
import { cartItemTable } from './schema/cartItem.sql.js';

type CartSelect = typeof cartTable.$inferSelect;
type CartItemSelect = typeof cartItemTable.$inferSelect;

interface Select {
  cart: CartSelect;
  cart_item: CartItemSelect | null;
}

const toCart =
  (aggregateId: CustomerId) =>
  (selects: ReadonlyArray<Select>): Result<Cart, CartNotFoundError> => {
    if (selects.length === 0) {
      return err(new CartNotFoundError(aggregateId));
    }

    const { sequenceNumber } = selects[0]!.cart;

    const cartItems = selects.reduce<Array<CartItem>>((acc, { cart_item }) => {
      if (cart_item === null) {
        return acc;
      }
      const { productId, price, quantity } = cart_item;
      return [...acc, { productId, price, quantity }];
    }, []);

    return ok(
      Cart.parse({
        aggregateId,
        sequenceNumber,
        cartItems,
      }),
    );
  };

const buildFindById =
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

buildFindById.inject = [Db.token] as const;

const CartRepository = {
  buildFindById,
} as const;

export { CartRepository };
