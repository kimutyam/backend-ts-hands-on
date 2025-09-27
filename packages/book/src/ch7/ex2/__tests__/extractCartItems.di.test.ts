import { Cart } from 'ch7/ex1/cart.js';
import { CustomerId } from 'ch7/ex1/customerId.js';
import { Price } from 'ch7/ex1/price.js';
import { ProductId } from 'ch7/ex1/productId.js';
import { Quantity } from 'ch7/ex1/quantity.js';
import { buildFindCartById } from 'ch7/ex2/cartRepositoryOnMemory.js';
import { ExtractCartItems } from 'ch7/ex2/extractCartItems.js';
import { createInjector } from 'typed-inject';

describe('extractCartItem', () => {
  it('success', async () => {
    const customerId1 = CustomerId.generate();
    const cartItem = {
      productId: ProductId.generate(),
      quantity: Quantity.valueOf(10),
      price: Price.valueOf(1_000),
    };
    const cart = Cart.create(customerId1, [cartItem]);
    const aggregates = new Map([[customerId1, cart]]);

    const injector = createInjector()
      .provideValue('aggregates', aggregates)
      .provideFactory('findCartById', buildFindCartById);

    const extractCartItems = injector.injectFunction(ExtractCartItems.build);

    const result = await extractCartItems(customerId1);

    expect(result[0]).toStrictEqual(cartItem);
  });
});
