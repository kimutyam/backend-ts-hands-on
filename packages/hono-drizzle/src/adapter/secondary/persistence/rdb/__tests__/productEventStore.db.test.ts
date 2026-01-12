import assert from 'node:assert';

import { sql } from 'drizzle-orm';
import type { PgRaw } from 'drizzle-orm/pg-core/query-builders/raw';
import type { QueryResult } from 'pg';
import * as R from 'remeda';
import { describe } from 'vitest';

import { DomainEvent } from '../../../../../app/domain/domainEvent.js';
import { Price } from '../../../../../app/domain/product/price.js';
import { Product } from '../../../../../app/domain/product/product.js';
import { ProductRegistered } from '../../../../../app/domain/product/productEvent.js';
import { ProductId } from '../../../../../app/domain/product/productId.js';
import { ProductName } from '../../../../../app/domain/product/productName.js';
import { ProductNameDuplicatedError } from '../../../../../app/domain/product/productNameDuplicatedError.js';
import type { Db } from '../db.js';
import { ProductEventStore } from '../productEventStore.js';
import { TestDb } from './helper/db.js';
import { buildSelectDomainEvent } from './helper/domainEvent.js';
import { truncateTables } from './helper/table.js';

const buildSelectProduct =
  (db: Db) =>
  (
    aggregateId: ProductId,
  ): PgRaw<
    QueryResult<
      Pick<Product, 'aggregateId' | 'sequenceNumber' | 'name' | 'price'>
    >
  > =>
    db.execute<
      Pick<Product, 'aggregateId' | 'sequenceNumber' | 'name' | 'price'>
    >(
      sql`
        SELECT
          product_id "aggregateId",
          sequence_number "sequenceNumber",
          name,
          price
        FROM
          product
        WHERE
          product_id = ${aggregateId}`,
    );

describe.sequential('ProductEventStore', () => {
  const productEventStore = ProductEventStore.createStoreFn(TestDb);
  const selectProduct = buildSelectProduct(TestDb);
  const selectDomainEvent = buildSelectDomainEvent(TestDb);

  beforeEach(async () => {
    await truncateTables(TestDb);
  });

  afterAll(async () => {
    await truncateTables(TestDb);
    await TestDb.$client.end();
  });

  it('商品を登録できる', async () => {
    const aggregateId = ProductId.generate();
    const aggregate = Product.parse({
      aggregateId,
      sequenceNumber: 1,
      name: ProductName.parse('Apple'),
      price: Price.parse(1_000),
    });
    const event: ProductRegistered = R.pipe(
      aggregate,
      DomainEvent.generate(Product.aggregateName, ProductRegistered.eventName, {
        product: aggregate,
      }),
    );

    const result = await productEventStore(event, aggregate);
    assert(result.isOk());

    const productResult = await selectProduct(aggregateId);
    const eventResult = await selectDomainEvent(event.eventId);

    expect(productResult.rowCount).toBe(1);
    expect(productResult.rows[0]).toStrictEqual({
      aggregateId,
      sequenceNumber: 1,
      name: ProductName.parse('Apple'),
      price: 1_000,
    });
    expect(eventResult.rowCount).toBe(1);
    expect(eventResult.rows[0]).toEqual({
      sequenceNumber: 1,
      payload: {
        product: aggregate,
      },
    });
  });

  it('商品名が重複した場合はロールバックされる', async () => {
    const productName = ProductName.parse('Orange');
    const aggregate1 = Product.parse({
      aggregateId: ProductId.generate(),
      sequenceNumber: 1,
      name: productName,
      price: Price.parse(1_000),
    });
    const event1: ProductRegistered = R.pipe(
      aggregate1,
      DomainEvent.generate(Product.aggregateName, ProductRegistered.eventName, {
        product: aggregate1,
      }),
    );
    const aggregate2 = Product.parse({
      aggregateId: ProductId.generate(),
      sequenceNumber: 1,
      name: productName,
      price: Price.parse(1_200),
    });
    const event2: ProductRegistered = R.pipe(
      aggregate2,
      DomainEvent.generate(Product.aggregateName, ProductRegistered.eventName, {
        product: aggregate2,
      }),
    );

    const firstResult = await productEventStore(event1, aggregate1);
    assert(firstResult.isOk());

    const secondResult = await productEventStore(event2, aggregate2);
    assert(secondResult.isErr());
    expect(secondResult.error.kind).toBe(ProductNameDuplicatedError.kind);

    const product1Result = await selectProduct(aggregate1.aggregateId);
    const product2Result = await selectProduct(aggregate2.aggregateId);
    const event1Result = await selectDomainEvent(event1.eventId);
    const event2Result = await selectDomainEvent(event2.eventId);

    expect(product1Result.rowCount).toBe(1);
    expect(product2Result.rowCount).toBe(0);
    expect(event1Result.rowCount).toBe(1);
    expect(event2Result.rowCount).toBe(0);
  });
});
