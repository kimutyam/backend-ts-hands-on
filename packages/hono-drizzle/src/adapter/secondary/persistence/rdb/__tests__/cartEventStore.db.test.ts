import { sql } from 'drizzle-orm';
import type { PgRaw } from 'drizzle-orm/pg-core/query-builders/raw';
import type { QueryResult } from 'pg';
import * as R from 'remeda';
import { beforeEach, describe } from 'vitest';

import { Cart } from '../../../../../app/domain/cart/cart.js';
import {
  CartCleared,
  CartItemAdded,
  CartItemRemoved,
  CartItemUpdated,
} from '../../../../../app/domain/cart/cartEvent.js';
import type { CartItem } from '../../../../../app/domain/cart/cartItem.js';
import { Quantity } from '../../../../../app/domain/cart/quantity.js';
import { CustomerId } from '../../../../../app/domain/customer/customerId.js';
import { DomainEvent } from '../../../../../app/domain/domainEvent.js';
import { Price } from '../../../../../app/domain/product/price.js';
import { ProductId } from '../../../../../app/domain/product/productId.js';
import { CartEventStore } from '../cartEventStore.js';
import type { Db } from '../db.js';
import { buildSetup } from './helper/cart.js';
import { testDb } from './helper/db.js';
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
  const cartEventStore = CartEventStore.createStoreFn(testDb);
  const selectCart = buildSelectCart(testDb);
  const selectCartItem = buildSelectCartItem(testDb);
  const selectDomainEvent = buildSelectDomainEvent(testDb);

  const customerId1 = CustomerId.generate();
  const customerId2 = CustomerId.generate();
  const customerId3 = CustomerId.generate();
  const productId1 = ProductId.generate();
  const productId2 = ProductId.generate();

  beforeEach(async () => {
    await truncateTables(testDb);
    const setup = buildSetup(testDb);
    await setup(productId1, productId2, customerId1, customerId2, customerId3);
  });

  afterAll(async () => {
    await truncateTables(testDb);
    await testDb.$client.end();
  });

  it('カート項目を追加できる (新規追加)', async () => {
    const cartItem = {
      productId: productId1,
      price: Price.parse(1_000),
      quantity: Quantity.parse(5),
    };
    const aggregate = Cart.parse({
      aggregateId: customerId2,
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

    const cartResult = await selectCart(customerId2);
    const cartItemResult = await selectCartItem(customerId2);
    const eventResult = await selectDomainEvent(event.eventId);

    expect(cartResult.rowCount).toBe(1);
    expect(cartResult.rows[0]).toStrictEqual({
      aggregateId: customerId2,
      sequenceNumber: 6,
    });
    expect(cartItemResult.rowCount).toBe(1);
    expect(cartItemResult.rows[0]).toStrictEqual({
      productId: productId1,
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
    const cartItem = {
      productId: productId1,
      price: Price.parse(1_010),
      quantity: Quantity.parse(3),
    };
    const aggregate = Cart.parse({
      aggregateId: customerId1,
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
    const cartResult = await selectCart(customerId1);
    const cartItemResult = await selectCartItem(customerId1);
    const eventResult = await selectDomainEvent(event.eventId);

    expect(cartResult.rowCount).toBe(1);
    expect(cartResult.rows[0]).toStrictEqual({
      aggregateId: customerId1,
      sequenceNumber: 2,
    });
    expect(cartItemResult.rowCount).toBe(1);
    expect(cartItemResult.rows[0]).toStrictEqual({
      productId: productId1,
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
    const aggregate = Cart.parse({
      aggregateId: customerId1,
      sequenceNumber: 2,
      cartItems: [],
    });

    const event: CartItemRemoved = R.pipe(
      aggregate,
      DomainEvent.generate(Cart.aggregateName, CartItemRemoved.eventName, {
        productId: productId1,
      }),
    );

    await cartEventStore(event, aggregate);
    const cartResult = await selectCart(customerId1);
    const cartItemResult = await selectCartItem(customerId1);
    const eventResult = await selectDomainEvent(event.eventId);

    expect(cartResult.rowCount).toBe(1);
    expect(cartResult.rows[0]).toStrictEqual({
      aggregateId: customerId1,
      sequenceNumber: 2,
    });
    expect(cartItemResult.rowCount).toBe(0);
    expect(eventResult.rowCount).toBe(1);
    expect(eventResult.rows[0]).toEqual({
      sequenceNumber: 2,
      payload: {
        productId: productId1,
      },
    });
  });

  it('カートを空にできる', async () => {
    const aggregate = Cart.parse({
      aggregateId: customerId1,
      sequenceNumber: 2,
      cartItems: [],
    });

    const event: CartCleared = R.pipe(
      aggregate,
      DomainEvent.generate(Cart.aggregateName, CartCleared.eventName, {
        aggregateId: customerId1,
        reason: 'OnManual',
      }),
    );

    await cartEventStore(event, aggregate);
    const cartResult = await selectCart(customerId1);
    const cartItemResult = await selectCartItem(customerId1);
    const eventResult = await selectDomainEvent(event.eventId);

    expect(cartResult.rowCount).toBe(1);
    expect(cartResult.rows[0]).toStrictEqual({
      aggregateId: customerId1,
      sequenceNumber: 2,
    });
    expect(cartItemResult.rowCount).toBe(0);
    expect(eventResult.rowCount).toBe(1);
    expect(cartItemResult.rowCount).toBe(0);
    expect(eventResult.rows[0]).toEqual({
      sequenceNumber: 2,
      payload: {
        aggregateId: customerId1,
        reason: 'OnManual',
      },
    });
  });
});
