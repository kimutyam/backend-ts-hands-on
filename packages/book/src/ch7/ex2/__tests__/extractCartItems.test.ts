import { Cart } from 'ch7/ex1/cart.js';
import { CartNotFoundError } from 'ch7/ex1/cartNotFoundError.js';
import { CustomerId } from 'ch7/ex1/customerId.js';
import { Price } from 'ch7/ex1/price.js';
import { ProductId } from 'ch7/ex1/productId.js';
import { Quantity } from 'ch7/ex1/quantity.js';
import { buildExtractCartItems } from 'ch7/ex2/extractCartItems.js';
import { errAsync, okAsync } from 'neverthrow';

describe('extractCartItem', () => {
  it('カートが存在する場合は、そのカート内のカート項目を抽出できる', async () => {
    const customerId = CustomerId.generate();
    const cartItems = [
      {
        productId: ProductId.generate(),
        quantity: Quantity.valueOf(1),
        price: Price.valueOf(1_000),
      },
    ];
    const cart = Cart.valueOf(customerId, cartItems);
    const findCartById = () => okAsync(cart);
    const extractCartItems = buildExtractCartItems(findCartById);
    const result = await extractCartItems(customerId);
    expect(result).toStrictEqual(cartItems);
  });

  it('カートが存在しない場合は、抽出するカート項目は空になる', async () => {
    const customerId = CustomerId.generate();
    const findCartById = () => errAsync(new CartNotFoundError(customerId));
    const extractCartItems = buildExtractCartItems(findCartById);
    const result = await extractCartItems(customerId);
    expect(result).toStrictEqual([]);
  });
});
