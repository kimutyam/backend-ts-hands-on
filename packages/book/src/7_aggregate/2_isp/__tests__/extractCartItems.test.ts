import { errAsync, okAsync } from 'neverthrow';
import { Cart } from '../../1/cart';
import { CartNotFoundError } from '../../1/cartNotFoundError';
import { CustomerId } from '../../1/customerId';
import { Price } from '../../1/price';
import { ProductId } from '../../1/productId';
import { Quantity } from '../../1/quantity';
import { buildExtractCartItems } from '../extractCartItems';

describe('extractCartItem', () => {
  it('カートが存在する場合は、そのカート内のカート項目を抽出できる', async () => {
    const customerId = CustomerId.generate();
    const cartItems = [
      {
        productId: ProductId.generate(),
        quantity: Quantity.build(1),
        price: Price.build(1_000),
      },
    ];
    const cart = Cart.build(customerId, cartItems);
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
