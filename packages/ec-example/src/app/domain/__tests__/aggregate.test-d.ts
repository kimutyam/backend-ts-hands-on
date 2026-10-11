import { expectTypeOf } from 'vitest';
import { z } from 'zod';

import { Aggregate } from '#/app/domain/aggregate.js';
import { CartItem } from '#/app/domain/cart/cartItem.js';
import { Quantity } from '#/app/domain/cart/quantity.js';
import { CustomerId } from '#/app/domain/customer/customerId.js';
import { Price } from '#/app/domain/product/price.js';
import { ProductId } from '#/app/domain/product/productId.js';

interface CartNotBranded extends Aggregate<CustomerId> {
  readonly cartItems: ReadonlyArray<CartItem>;
}

it('集約のスキーマを生成できる', () => {
  const schema = Aggregate.makeSchema(
    CustomerId.schema,
    z.object({
      cartItems: z.array(CartItem.schema).readonly(),
    }),
    { id: 'Cart' },
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cart = schema.parse({
    aggregateId: CustomerId.generate(),
    sequenceNumber: 1,
    cartItems: [
      {
        productId: ProductId.generate(),
        quantity: Quantity.parse(1),
        price: Price.parse(1_000),
      },
    ],
  });

  expectTypeOf<typeof cart>().toEqualTypeOf<CartNotBranded>();
});
