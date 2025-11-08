import * as R from 'remeda';

import { Cart } from '../cart.js';
import { CustomerId } from '../customerId.js';
import { Price } from '../price.js';
import { ProductId } from '../productId.js';
import { Quantity } from '../quantity.js';

describe('addCartItem', () => {
  it('空のカートに追加', () => {
    const customId = CustomerId.generate();
    const productId = ProductId.generate();
    const cartItem = {
      productId,
      quantity: Quantity.valueOf(1),
      price: Price.valueOf(1_000),
    };

    const addedCart = R.pipe(Cart.init(customId), Cart.addCartItem(cartItem));
    expect(addedCart.cartItems).toStrictEqual([cartItem]);
  });

  it('カート項目に存在しないカート項目を追加', () => {
    const customId = CustomerId.generate();
    const cartItem = {
      productId: ProductId.generate(),
      quantity: Quantity.valueOf(6),
      price: Price.valueOf(1_000),
    };

    const targetCartItem = {
      productId: ProductId.generate(),
      quantity: Quantity.valueOf(3),
      price: Price.valueOf(2_222),
    };
    const addedCart = R.pipe(
      Cart.create(customId, [cartItem]),
      Cart.addCartItem(targetCartItem),
    );
    const expectation = Cart.create(customId, [cartItem, targetCartItem]);
    expect(addedCart).toStrictEqual(expectation);
  });

  it('カート項目に存在するカート項目を追加', () => {
    const customId = CustomerId.generate();
    const cartItems = [
      {
        productId: ProductId.generate(),
        quantity: Quantity.valueOf(6),
        price: Price.valueOf(1_000),
      },
      {
        productId: ProductId.generate(),
        quantity: Quantity.valueOf(5),
        price: Price.valueOf(2_000),
      },
    ];
    const targetCartItem = {
      productId: cartItems[1]!.productId,
      quantity: Quantity.valueOf(3),
      price: Price.valueOf(2_222),
    };
    const addedCart = R.pipe(
      Cart.create(customId, cartItems),
      Cart.addCartItem(targetCartItem),
    );
    const expectation = Cart.create(customId, [
      cartItems[0]!,
      {
        ...cartItems[1]!,
        quantity: Quantity.valueOf(8),
        price: Price.valueOf(2_222),
      },
    ]);
    expect(addedCart).toStrictEqual(expectation);
  });
});

describe('removeCartItem', () => {
  it('カート項目を削除', () => {
    const customId = CustomerId.generate();
    const cartItems = [
      {
        productId: ProductId.generate(),
        quantity: Quantity.valueOf(6),
        price: Price.valueOf(1_000),
      },
      {
        productId: ProductId.generate(),
        quantity: Quantity.valueOf(5),
        price: Price.valueOf(2_000),
      },
    ];
    const removedCart = R.pipe(
      Cart.create(customId, cartItems),
      Cart.removeCartItem(cartItems[0]!.productId),
    );
    const expectation = Cart.create(customId, [cartItems[1]!]);
    expect(removedCart).toStrictEqual(expectation);
  });
});
