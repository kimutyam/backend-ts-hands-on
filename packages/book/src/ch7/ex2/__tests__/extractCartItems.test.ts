import { errAsync, okAsync } from 'neverthrow';

import { Cart } from '../../ex1/cart.js';
import { CartNotFoundError } from '../../ex1/cartNotFoundError.js';
import { CustomerId } from '../../ex1/customerId.js';
import { Price } from '../../ex1/price.js';
import { ProductId } from '../../ex1/productId.js';
import { Quantity } from '../../ex1/quantity.js';
import { ExtractCartItems } from '../extractCartItems.js';

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
    const cart = Cart.create(customerId, cartItems);
    const findCartById = () => okAsync(cart);
    const extractCartItems = ExtractCartItems.create(findCartById);
    const result = await extractCartItems(customerId);
    expect(result).toStrictEqual(cartItems);
  });

  it('カートが存在しない場合は、抽出するカート項目は空になる', async () => {
    const customerId = CustomerId.generate();
    const findCartById = () => errAsync(CartNotFoundError.create(customerId));
    const extractCartItems = ExtractCartItems.create(findCartById);
    const result = await extractCartItems(customerId);
    expect(result).toStrictEqual([]);
  });
});
