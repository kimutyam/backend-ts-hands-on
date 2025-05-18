import { eq } from 'drizzle-orm';
import type { Result } from 'neverthrow';
import { err, ok, ResultAsync } from 'neverthrow';

import { Cart } from '../../../domain/cart/cart.js';
import type { CartItem } from '../../../domain/cart/cartItem.js';
import { CartNotFoundError } from '../../../domain/cart/cartNotFoundError.js';
import type { FindCartById } from '../../../domain/cart/cartRepository.js';
import type { Quantity } from '../../../domain/cart/quantity.js';
import type { CustomerId } from '../../../domain/customer/customerId.js';
import type { Price } from '../../../domain/product/price.js';
import type { ProductId } from '../../../domain/product/productId.js';
import { Db } from './db.js';
import { cartTable } from './schema/cart.sql.js';
import { cartItemTable } from './schema/cartItem.sql.js';

interface Row {
  cart: {
    createdAt: Date;
    updatedAt: Date;
    customerId: CustomerId;
    sequenceNumber: number;
  };
  cart_item: {
    createdAt: Date;
    updatedAt: Date;
    customerId: CustomerId;
    productId: ProductId;
    price: Price;
    quantity: Quantity;
  } | null;
}

const toCart =
  (aggregateId: CustomerId) =>
  (rows: ReadonlyArray<Row>): Result<Cart, CartNotFoundError> => {
    if (rows.length === 0) {
      return err(new CartNotFoundError(aggregateId));
    }

    const cartItems = rows.reduce<Array<CartItem>>((acc, { cart_item }) => {
      if (cart_item === null) {
        return acc;
      }
      const { productId, price, quantity } = cart_item;
      return [...acc, { productId, price, quantity }];
    }, []);

    return ok(
      Cart.parse({
        aggregateId,
        sequenceNumber: rows[0]!.cart.sequenceNumber,
        cartItems,
      }),
    );
  };

const buildFindCartById =
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

buildFindCartById.inject = [Db.token] as const;

export { buildFindCartById };
