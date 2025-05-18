import { eq } from 'drizzle-orm';
import type { Result } from 'neverthrow';
import { err, ok, ResultAsync } from 'neverthrow';

import { Cart } from '../../../domain/cart/cart.js';
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
  readonly customerId: CustomerId;
  readonly sequenceNumber: number;
  readonly productId: ProductId;
  readonly price: Price;
  readonly quantity: Quantity;
}

const toCart =
  (aggregateId: CustomerId) =>
  (rows: ReadonlyArray<Row>): Result<Cart, CartNotFoundError> => {
    if (rows.length === 0) {
      return err(new CartNotFoundError(aggregateId));
    }
    const cartItems = rows.map(({ productId, price, quantity }) => ({
      productId,
      price,
      quantity,
    }));
    return ok(
      Cart.parse({
        aggregateId: rows[0]!.customerId,
        sequenceNumber: rows[0]!.sequenceNumber,
        cartItems,
      }),
    );
  };

// カートアイテムが空だったらどうする？
// シーケンス番号やversionは取ってきたいよね。
const buildFindCartById =
  (db: Db): FindCartById =>
  (aggregateId) =>
    ResultAsync.fromSafePromise(
      db
        .select({
          customerId: cartTable.customerId,
          sequenceNumber: cartTable.sequenceNumber,
          productId: cartItemTable.productId,
          price: cartItemTable.price,
          quantity: cartItemTable.quantity,
        })
        .from(cartTable)
        .innerJoin(
          cartItemTable,
          eq(cartTable.customerId, cartItemTable.customerId),
        )
        .where(eq(cartTable.customerId, aggregateId)),
    ).andThen(toCart(aggregateId));

buildFindCartById.inject = [Db.token] as const;

export { buildFindCartById };
