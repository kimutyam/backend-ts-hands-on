import { sql } from 'drizzle-orm';
import type { PgRaw } from 'drizzle-orm/pg-core/query-builders/raw';
import type { QueryResult } from 'pg';
import * as R from 'remeda';
import { describe } from 'vitest';

import { Cart } from '../../../../../app/domain/cart/cart.js';
import {
  CartCleared,
  CartItemAdded,
  CartItemRemoved,
  CartItemUpdated,
} from '../../../../../app/domain/cart/cartEvent.js';
import { CartItem } from '../../../../../app/domain/cart/cartItem.js';
import { Quantity } from '../../../../../app/domain/cart/quantity.js';
import { CustomerId } from '../../../../../app/domain/customer/customerId.js';
import { DomainEvent } from '../../../../../app/domain/domainEvent.js';
import { OptimisticLockError } from '../../../../../app/domain/optimisticLockError.js';
import { Price } from '../../../../../app/domain/product/price.js';
import { ProductId } from '../../../../../app/domain/product/productId.js';
import { CartEventStore } from '../cartEventStore.js';
import type { Db } from '../db.js';
import { TestDb } from './helper/db.js';
import { buildSelectDomainEvent } from './helper/domainEvent.js';
import { truncateTables } from './helper/table.js';

const buildSelectCart =
  (db: Db) =>
  (
    aggregateId: CustomerId,
  ): PgRaw<QueryResult<Pick<Cart, 'aggregateId' | 'sequenceNumber'>>> =>
    db.execute<Pick<Cart, 'aggregateId' | 'sequenceNumber'>>(
      sql`
        SELECT
          customer_id "aggregateId",
          sequence_number "sequenceNumber"
        FROM
          cart
        WHERE
          customer_id = ${aggregateId}`,
    );

const buildSelectCartItem =
  (db: Db) =>
  (customerId: CustomerId): PgRaw<QueryResult<CartItem>> =>
    db.execute<CartItem>(
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

describe.sequential('CartEventStore', () => {
  const cartEventStore = CartEventStore.createStoreFn(TestDb);
  const selectCart = buildSelectCart(TestDb);
  const selectCartItem = buildSelectCartItem(TestDb);
  const selectDomainEvent = buildSelectDomainEvent(TestDb);

  beforeEach(async () => {
    await truncateTables(TestDb);
  });

  afterAll(async () => {
    await truncateTables(TestDb);
    await TestDb.$client.end();
  });

  it('カート項目を追加できる (新規追加)', async () => {
    const customerId = CustomerId.generate();
    const productId = ProductId.generate();
    const cartItem = {
      productId,
      price: Price.parse(1_000),
      quantity: Quantity.parse(5),
    };

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

    await cartEventStore(event, aggregate);
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
    const cartItem = {
      productId,
      price: Price.parse(1_010),
      quantity: Quantity.parse(3),
    };
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

    await cartEventStore(event, aggregate);
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

    await cartEventStore(event, aggregate);
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
        reason: 'OnManual',
      }),
    );

    await cartEventStore(event, aggregate);
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
        reason: 'OnManual',
      },
    });
  });

  it('楽観ロックが検知された場合はエラーになる', async () => {
    const customerId = CustomerId.generate();
    const productId = ProductId.generate();

    const cartItem = CartItem.parse({
      productId,
      price: Price.parse(1_000),
      quantity: Quantity.parse(1),
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

    await cartEventStore(event1, aggregate1);

    const updatedCartItem = CartItem.parse({
      productId,
      price: Price.parse(2_000),
      quantity: Quantity.parse(2),
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

    await expect(cartEventStore(staleEvent, staleAggregate)).rejects.toThrow(
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
