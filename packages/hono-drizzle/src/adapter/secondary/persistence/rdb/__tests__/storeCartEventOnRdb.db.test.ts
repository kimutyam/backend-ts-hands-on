import { sql } from 'drizzle-orm';
import * as R from 'remeda';

import { getDbInstanceFromEnv } from '#/adapter/secondary/persistence/rdb/__tests__/helper/db.js';
import { createSelectDomainEventFn } from '#/adapter/secondary/persistence/rdb/__tests__/helper/domainEvent.js';
import type { Db } from '#/adapter/secondary/persistence/rdb/db.js';
import { StoreCartEventOnRdb } from '#/adapter/secondary/persistence/rdb/storeCartEventOnRdb.js';
import { Cart } from '#/app/domain/cart/cart.js';
import {
  CartCleared,
  CartItemAdded,
  CartItemRemoved,
  CartItemUpdated,
} from '#/app/domain/cart/cartEvent.js';
import { CartItem } from '#/app/domain/cart/cartItem.js';
import { CustomerId } from '#/app/domain/customer/customerId.js';
import { DomainEvent } from '#/app/domain/domainEvent.js';
import { OptimisticLockError } from '#/app/domain/optimisticLockError.js';
import { ProductId } from '#/app/domain/product/productId.js';

type Row = Pick<Cart, 'aggregateId' | 'sequenceNumber'>;

const createSelectCartFn =
  (db: Db) =>
  (aggregateId: CustomerId): ReturnType<typeof db.execute<Row>> =>
    db.execute(
      sql`
        SELECT
          customer_id "aggregateId",
          sequence_number "sequenceNumber"
        FROM
          cart
        WHERE
          customer_id = ${aggregateId}`,
    );

const createSelectCartItemFn =
  (db: Db) =>
  (customerId: CustomerId): ReturnType<typeof db.execute<CartItem>> =>
    db.execute(
      sql`
        SELECT
          product_id "productId",
          price,
          quantity
        FROM
          cart_item
        WHERE
          customer_id = ${customerId}`,
    );

const createTruncateTableFn = (db: Db) => async (): Promise<void> => {
  await db.execute('TRUNCATE TABLE domain_event, cart, cart_item');
};

describe('CartEventStore', () => {
  const db = getDbInstanceFromEnv();
  const storeCartEvent = StoreCartEventOnRdb.createStoreFn(db);
  const truncateTable = createTruncateTableFn(db);
  const selectCart = createSelectCartFn(db);
  const selectCartItem = createSelectCartItemFn(db);
  const selectDomainEvent = createSelectDomainEventFn(db);

  beforeEach(async () => {
    await truncateTable();
  });

  afterAll(async () => {
    await truncateTable();
    await db.$client.end();
  });

  it('カート項目を追加できる (新規追加)', async () => {
    const customerId = CustomerId.generate();
    const productId = ProductId.generate();
    const cartItem = CartItem.parse({
      productId,
      price: 1_000,
      quantity: 5,
    });

    const aggregate = Cart.parse({
      aggregateId: customerId,
      sequenceNumber: 6,
      cartItems: [cartItem],
    });
    const event: CartItemAdded = R.pipe(
      aggregate,
      DomainEvent.generate(Cart.aggregateName, CartItemAdded.eventName, {
        cartItem,
      }),
    );

    await storeCartEvent(event, aggregate);
    const cartResult = await selectCart(customerId);
    const cartItemResult = await selectCartItem(customerId);
    const eventResult = await selectDomainEvent(event.eventId);

    expect(cartResult.rowCount).toBe(1);
    expect(cartResult.rows[0]).toStrictEqual({
      aggregateId: customerId,
      sequenceNumber: 6,
    });
    expect(cartItemResult.rowCount).toBe(1);
    expect(cartItemResult.rows[0]).toStrictEqual({
      productId,
      price: 1_000,
      quantity: 5,
    });
    expect(eventResult.rowCount).toBe(1);
    expect(eventResult.rows[0]).toEqual({
      sequenceNumber: 6,
      payload: {
        cartItem,
      },
    });
  });

  it('カート項目を追加できる (更新)', async () => {
    const customerId = CustomerId.generate();
    const productId = ProductId.generate();
    const cartItem = CartItem.parse({
      productId,
      price: 1_010,
      quantity: 3,
    });
    const aggregate = Cart.parse({
      aggregateId: customerId,
      sequenceNumber: 2,
      cartItems: [cartItem],
    });
    const event: CartItemUpdated = R.pipe(
      aggregate,
      DomainEvent.generate(Cart.aggregateName, CartItemUpdated.eventName, {
        cartItem,
      }),
    );

    await storeCartEvent(event, aggregate);
    const cartResult = await selectCart(customerId);
    const cartItemResult = await selectCartItem(customerId);
    const eventResult = await selectDomainEvent(event.eventId);

    expect(cartResult.rowCount).toBe(1);
    expect(cartResult.rows[0]).toStrictEqual({
      aggregateId: customerId,
      sequenceNumber: 2,
    });
    expect(cartItemResult.rowCount).toBe(1);
    expect(cartItemResult.rows[0]).toStrictEqual({
      productId,
      price: 1_010,
      quantity: 3,
    });

    expect(eventResult.rowCount).toBe(1);
    expect(eventResult.rows[0]).toEqual({
      sequenceNumber: 2,
      payload: {
        cartItem,
      },
    });
  });

  it('カート項目を削除できる', async () => {
    const customerId = CustomerId.generate();
    const productId = ProductId.generate();

    const aggregate = Cart.parse({
      aggregateId: customerId,
      sequenceNumber: 2,
      cartItems: [],
    });

    const event: CartItemRemoved = R.pipe(
      aggregate,
      DomainEvent.generate(Cart.aggregateName, CartItemRemoved.eventName, {
        productId,
      }),
    );

    await storeCartEvent(event, aggregate);
    const cartResult = await selectCart(customerId);
    const cartItemResult = await selectCartItem(customerId);
    const eventResult = await selectDomainEvent(event.eventId);

    expect(cartResult.rowCount).toBe(1);
    expect(cartResult.rows[0]).toStrictEqual({
      aggregateId: customerId,
      sequenceNumber: 2,
    });
    expect(cartItemResult.rowCount).toBe(0);
    expect(eventResult.rowCount).toBe(1);
    expect(eventResult.rows[0]).toEqual({
      sequenceNumber: 2,
      payload: {
        productId,
      },
    });
  });

  it('カートを空にできる', async () => {
    const customerId = CustomerId.generate();
    const aggregate = Cart.parse({
      aggregateId: customerId,
      sequenceNumber: 2,
      cartItems: [],
    });

    const event: CartCleared = R.pipe(
      aggregate,
      DomainEvent.generate(Cart.aggregateName, CartCleared.eventName, {
        aggregateId: customerId,
        trigger: 'CustomerOperation',
      }),
    );

    await storeCartEvent(event, aggregate);
    const cartResult = await selectCart(customerId);
    const cartItemResult = await selectCartItem(customerId);
    const eventResult = await selectDomainEvent(event.eventId);

    expect(cartResult.rowCount).toBe(1);
    expect(cartResult.rows[0]).toStrictEqual({
      aggregateId: customerId,
      sequenceNumber: 2,
    });
    expect(cartItemResult.rowCount).toBe(0);
    expect(eventResult.rowCount).toBe(1);
    expect(cartItemResult.rowCount).toBe(0);
    expect(eventResult.rows[0]).toEqual({
      sequenceNumber: 2,
      payload: {
        aggregateId: customerId,
        trigger: 'CustomerOperation',
      },
    });
  });

  it('楽観ロックが検知された場合はエラーになる', async () => {
    const customerId = CustomerId.generate();
    const productId = ProductId.generate();

    const cartItem = CartItem.parse({
      productId,
      price: 1_000,
      quantity: 1,
    });

    const aggregate1 = Cart.parse({
      aggregateId: customerId,
      sequenceNumber: 1,
      cartItems: [cartItem],
    });
    const event1: CartItemAdded = R.pipe(
      aggregate1,
      DomainEvent.generate(Cart.aggregateName, CartItemAdded.eventName, {
        cartItem,
      }),
    );

    await storeCartEvent(event1, aggregate1);

    const updatedCartItem = CartItem.parse({
      productId,
      price: 2_000,
      quantity: 2,
    });

    const staleAggregate = Cart.parse({
      aggregateId: customerId,
      sequenceNumber: 1,
      cartItems: [updatedCartItem],
    });
    const staleEvent: CartItemUpdated = R.pipe(
      staleAggregate,
      DomainEvent.generate(Cart.aggregateName, CartItemUpdated.eventName, {
        cartItem: updatedCartItem,
      }),
    );

    await expect(storeCartEvent(staleEvent, staleAggregate)).rejects.toThrow(
      OptimisticLockError,
    );

    const cartResult = await selectCart(customerId);
    const cartItemResult = await selectCartItem(customerId);
    const eventResult = await selectDomainEvent(staleEvent.eventId);

    expect(cartResult.rowCount).toBe(1);
    expect(cartResult.rows[0]).toStrictEqual({
      aggregateId: customerId,
      sequenceNumber: 1,
    });
    expect(cartItemResult.rowCount).toBe(1);
    expect(cartItemResult.rows[0]).toStrictEqual(cartItem);
    expect(eventResult.rowCount).toBe(0);
  });
});
