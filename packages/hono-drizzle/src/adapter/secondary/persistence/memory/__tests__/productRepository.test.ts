import assert from 'node:assert';

import * as R from 'remeda';
import { describe } from 'vitest';

import { Aggregate } from '../../../../../app/domain/aggregate.js';
import { Price } from '../../../../../app/domain/product/price.js';
import { Product } from '../../../../../app/domain/product/product.js';
import type { ProductRegistered } from '../../../../../app/domain/product/productEvent.js';
import { ProductId } from '../../../../../app/domain/product/productId.js';
import { ProductName } from '../../../../../app/domain/product/productName.js';
import { ProductRepository } from '../productRepository.js';

const registerProduct = (
  aggregateId: ProductId,
  name: ProductName,
  price: Price,
): [Product, ProductRegistered] =>
  R.pipe(
    {
      aggregateId,
      sequenceNumber: Aggregate.InitialSequenceNumber,
      name,
      price,
    },
    Product.parse,
    Product.register,
  );

describe('FindCartById', () => {
  const [product1, event1] = registerProduct(
    ProductId.generate(),
    ProductName.parse('Banana'),
    Price.parse(1000),
  );
  const [product2, event2] = registerProduct(
    ProductId.generate(),
    ProductName.parse('Apple'),
    Price.parse(1000),
  );
  const [product3, event3] = registerProduct(
    ProductId.generate(),
    ProductName.parse('Orange'),
    Price.parse(1000),
  );

  const [product4, event4] = registerProduct(
    ProductId.generate(),
    ProductName.parse('Banana'),
    Price.parse(1000),
  );

  const repository = ProductRepository.create(
    [event1, event2],
    new Map([
      [product1.aggregateId, product1],
      [product2.aggregateId, product2],
    ]),
  );

  it('保存できる', async () => {
    const storeResult = await repository.store(event3, product3);
    assert(storeResult.isOk());
    const findResult = await repository.findById(product3.aggregateId);
    assert(findResult.isOk());
    expect(findResult.value).toStrictEqual(product3);
  });

  it('重複した商品名を保存できない', async () => {
    const result = await repository.store(event4, product4);
    assert(result.isErr());
    expect(result.error.productId).toStrictEqual(product4.aggregateId);
  });
});
