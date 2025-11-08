import { Aggregate } from '../../../../../../app/domain/aggregate.js';
import { Quantity } from '../../../../../../app/domain/cart/quantity.js';
import type { CustomerId } from '../../../../../../app/domain/customer/customerId.js';
import { Price } from '../../../../../../app/domain/product/price.js';
import type { ProductId } from '../../../../../../app/domain/product/productId.js';
import type { Db } from '../../db.js';
import { cartTable } from '../../schema/cart.sql.js';
import { cartItemTable } from '../../schema/cartItem.sql.js';

const buildSetup =
  (db: Db) =>
  async (
    productId1: ProductId,
    customerId1: CustomerId,
    customerId2: CustomerId,
  ) => {
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
