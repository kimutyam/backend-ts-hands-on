import { Aggregate } from '../../../../../domain/aggregate.js';
import { Quantity } from '../../../../../domain/cart/quantity.js';
import type { CustomerId } from '../../../../../domain/customer/customerId.js';
import { Price } from '../../../../../domain/product/price.js';
import type { ProductId } from '../../../../../domain/product/productId.js';
import type { Db } from '../../db.js';
import { cartTable } from '../../schema/cart.sql.js';
import { cartItemTable } from '../../schema/cartItem.sql.js';
import { customerTable } from '../../schema/customer.sql.js';
import { productTable } from '../../schema/product.sql.js';

const buildSetup =
  (db: Db) =>
  async (
    productId1: ProductId,
    productId2: ProductId,
    customerId1: CustomerId,
    customerId2: CustomerId,
    customerId3: CustomerId,
  ) => {
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
      {
        customerId: customerId3,
        name: 'Customer3',
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
  };

export { buildSetup };
