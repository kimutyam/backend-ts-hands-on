import { sql } from 'drizzle-orm';
import type { PgRaw } from 'drizzle-orm/pg-core/query-builders/raw';
import type { QueryResult } from 'pg';
import * as R from 'remeda';
import { beforeEach, describe } from 'vitest';

import { Aggregate } from '../../../../../domain/aggregate.js';
import { Cart } from '../../../../../domain/cart/cart.js';
import {
  CartCleared,
  type CartEvent,
  CartItemAdded,
  CartItemRemoved,
  CartItemUpdated,
} from '../../../../../domain/cart/cartEvent.js';
import type { CartItem } from '../../../../../domain/cart/cartItem.js';
import { Quantity } from '../../../../../domain/cart/quantity.js';
import { CustomerId } from '../../../../../domain/customer/customerId.js';
import { DomainEvent } from '../../../../../domain/domainEvent.js';
import type { DomainEventId } from '../../../../../domain/domainEventId.js';
import { Price } from '../../../../../domain/product/price.js';
import { ProductId } from '../../../../../domain/product/productId.js';
import { truncateTables } from '../../__tests__/helpers.js';
import { Db } from '../../db.js';
import { PgPool } from '../../pgPool.js';
import { cartTable } from '../../schema/cart.sql.js';
import { cartItemTable } from '../../schema/cartItem.sql.js';
import { customerTable } from '../../schema/customer.sql.js';
import { productTable } from '../../schema/product.sql.js';
import { buildCartEventStore } from '../cartEventStore.js';

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

const buildSelectDomainEvent =
  (db: Db) =>
  <T extends CartEvent>(
    eventId: DomainEventId,
  ): PgRaw<QueryResult<Pick<T, 'sequenceNumber' | 'payload'>>> =>
    db.execute<Pick<T, 'sequenceNumber' | 'payload'>>(
      sql`
        SELECT
          sequence_number "sequenceNumber",
          payload
        FROM
          domain_event
        WHERE
          event_id = ${eventId}`,
    );

describe.sequential('CartEventStore', () => {
  const pool = PgPool.build();
  const db = Db.build(pool);
  const cartEventStore = buildCartEventStore(db);
  const selectCart = buildSelectCart(db);
  const selectCartItem = buildSelectCartItem(db);
  const selectDomainEvent = buildSelectDomainEvent(db);

  const customerId1 = CustomerId.generate();
  const customerId2 = CustomerId.generate();

  const productId1 = ProductId.generate();
  const productId2 = ProductId.generate();

  beforeEach(async () => {
    await truncateTables(db);
    await db.insert(productTable).values([
      {
        productId: productId1,
        sequenceNumber: Aggregate.InitialSequenceNumber,
        name: 'Product1',
        price: Price.parse(1_000),
      },
      {
        productId: productId2,
        sequenceNumber: Aggregate.InitialSequenceNumber,
        name: 'Product2',
        price: Price.parse(2_000),
      },
    ]);

    await db.insert(customerTable).values([
      {
        customerId: customerId1,
        name: 'Customer1',
      },
      {
        customerId: customerId2,
        name: 'Customer2',
      },
    ]);

    await db.insert(cartTable).values([
      {
        customerId: customerId1,
        sequenceNumber: Aggregate.InitialSequenceNumber,
      },
      {
        customerId: customerId2,
        sequenceNumber: 5,
      },
    ]);

    await db.insert(cartItemTable).values({
      customerId: customerId1,
      productId: productId1,
      price: Price.parse(1_000),
      quantity: Quantity.parse(2),
    });
  });

  afterAll(async () => {
    await truncateTables(db);
    await pool.end();
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
      DomainEvent.generate(Cart.name, CartItemAdded.eventName, {
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
      DomainEvent.generate(Cart.name, CartItemUpdated.eventName, {
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
      DomainEvent.generate(Cart.name, CartItemRemoved.eventName, {
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
      DomainEvent.generate(Cart.name, CartCleared.eventName, {
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
