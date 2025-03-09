import { Aggregate } from '9_always_valid_domain_model/50/aggregate.js';
import { CartItem } from '9_always_valid_domain_model/50/cartItem.js';
import { CustomerId } from '9_always_valid_domain_model/50/customerId.js';
import { Price } from '9_always_valid_domain_model/50/price.js';
import { ProductId } from '9_always_valid_domain_model/50/productId.js';
import { Quantity } from '9_always_valid_domain_model/50/quantity.js';
import { expectTypeOf } from 'vitest';
import { z } from 'zod';

interface Cart extends Aggregate<CustomerId> {
  readonly cartItems: ReadonlyArray<CartItem>;
}

it('集約のスキーマを生成できる', () => {
  const schema = Aggregate.makeSchema(
    CustomerId.schema,
    z.object({
      cartItems: z.array(CartItem.schema).readonly(),
    }),
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cart = schema.parse({
    aggregateId: CustomerId.generate(),
    sequenceNumber: 1,
    cartItems: [
      {
        productId: ProductId.generate(),
        quantity: Quantity.build(1),
        price: Price.build(1_000),
      },
    ],
  });

  expectTypeOf<typeof cart>().toEqualTypeOf<Cart>();
});
