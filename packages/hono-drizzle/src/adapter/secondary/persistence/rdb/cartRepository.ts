import { eq } from 'drizzle-orm';
import type { Result } from 'neverthrow';
import { err, ok, ResultAsync } from 'neverthrow';

import { Db } from '#/adapter/secondary/persistence/rdb/db.js';
import { cartTable } from '#/adapter/secondary/persistence/rdb/schema/cart.sql.js';
import { cartItemTable } from '#/adapter/secondary/persistence/rdb/schema/cartItem.sql.js';
import { Cart } from '#/app/domain/cart/cart.js';
import { CartItem } from '#/app/domain/cart/cartItem.js';
import { CartNotFoundError } from '#/app/domain/cart/cartNotFoundError.js';
import type { CustomerId } from '#/app/domain/customer/customerId.js';
import type { FindCartById } from '#/app/port/secondary/persistence/cartRepository.js';

type CartSelect = typeof cartTable.$inferSelect;
type CartItemSelect = typeof cartItemTable.$inferSelect;

interface Select {
  cart: CartSelect;
  cart_item: CartItemSelect | null;
}

const validateExists =
  (aggregateId: CustomerId) =>
  (selects: ReadonlyArray<Select>): Result<void, CartNotFoundError> =>
    selects.length === 0
      ? err(CartNotFoundError.create(aggregateId))
      : ok(undefined);

const validateUnique =
  (aggregateId: CustomerId) =>
  (selects: ReadonlyArray<Select>): void => {
    const customerIds = new Set(selects.map(({ cart }) => cart.customerId));
    if (customerIds.size > 1) {
      throw new Error(
        `カスタマーIDでの索引で複数のカートが見つかりました: ${aggregateId}`,
      );
    }
  };

const toCartItem = (select: CartItemSelect): CartItem => {
  const { productId, price, quantity } = select;
  return CartItem.parse({ productId, price, quantity });
};

const toCart = (selects: ReadonlyArray<Select>): Cart => {
  const { customerId, sequenceNumber } = selects[0]!.cart;

  const cartItems = selects.reduce<Array<CartItem>>((acc, { cart_item }) => {
    if (cart_item === null) {
      return acc;
    }
    return [...acc, toCartItem(cart_item)];
  }, []);

  return Cart.parse({
    aggregateId: customerId,
    sequenceNumber,
    cartItems,
  });
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
      .andThrough(validateExists(aggregateId))
      .andTee(validateUnique(aggregateId))
      .map(toCart);

createFindByIdFn.inject = [Db.token] as const;

const CartRepository = {
  createFindByIdFn,
} as const;

export { CartRepository };
