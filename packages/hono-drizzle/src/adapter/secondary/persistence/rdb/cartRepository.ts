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

const validate =
  (aggregateId: CustomerId) =>
  (
    selects: ReadonlyArray<Select>,
  ): Result<ReadonlyArray<Select>, CartNotFoundError> => {
    const selectCount = selects.length;
    if (selectCount === 0) {
      return err(CartNotFoundError.create(aggregateId));
    }

    if (selectCount > 1) {
      throw new Error(
        `顧客IDでの索引で複数のカートが見つかりました: ${aggregateId}`,
      );
    }
    return ok(selects);
  };

const toCartItem = (select: CartItemSelect): CartItem => {
  const { productId, price, quantity } = select;
  return CartItem.parse({ productId, price, quantity });
};

const toCart = (
  selects: ReadonlyArray<Select>,
): Result<Cart, CartNotFoundError> => {
  const { customerId, sequenceNumber } = selects[0]!.cart;

  const cartItems = selects.reduce<Array<CartItem>>((acc, { cart_item }) => {
    if (cart_item === null) {
      return acc;
    }
    return [...acc, toCartItem(cart_item)];
  }, []);

  return ok(
    Cart.parse({
      aggregateId: customerId,
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
    )
      .andThrough(validate(aggregateId))
      .andThen(toCart);

createFindByIdFn.inject = [Db.token] as const;

const CartRepository = {
  createFindByIdFn,
} as const;

export { CartRepository };
