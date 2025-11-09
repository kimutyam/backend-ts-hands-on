import { errAsync, okAsync } from 'neverthrow';

import { Aggregate } from '../../domain/aggregate.js';
import { Cart } from '../../domain/cart/cart.js';
import { CartNotFoundError } from '../../domain/cart/cartNotFoundError.js';
import { Quantity } from '../../domain/cart/quantity.js';
import { CustomerId } from '../../domain/customer/customerId.js';
import { Price } from '../../domain/product/price.js';
import { ProductId } from '../../domain/product/productId.js';
import { GetCartUseCase } from '../getCart.js';

describe('GetCartUseCase', () => {
  it('カートが存在する場合は、そのカート内のカート項目を取得できる', async () => {
    const customerId = CustomerId.generate();
    const cartItems = [
      {
        productId: ProductId.generate(),
        quantity: Quantity.parse(1),
        price: Price.parse(1_000),
      },
    ];
    const cart = Cart.parse({
      aggregateId: customerId,
      sequenceNumber: Aggregate.InitialSequenceNumber,
      cartItems,
    });
    const findCartById = () => okAsync(cart);
    const getCart = GetCartUseCase.create(findCartById);
    const result = await getCart(customerId);
    expect(result).toStrictEqual(cartItems);
  });

  it('カートが存在しない場合は、抽出するカート項目は空になる', async () => {
    const customerId = CustomerId.generate();
    const findCartById = () => errAsync(CartNotFoundError.create(customerId));
    const getCart = GetCartUseCase.create(findCartById);
    const result = await getCart(customerId);
    expect(result).toStrictEqual([]);
  });
});
