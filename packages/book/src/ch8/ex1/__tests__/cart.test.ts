import assert from 'node:assert';

import { Cart } from 'ch8/ex1/cart.js';
import { CustomerId } from 'ch8/ex1/customerId.js';
import { Price } from 'ch8/ex1/price.js';
import { ProductId } from 'ch8/ex1/productId.js';
import { Quantity } from 'ch8/ex1/quantity.js';
import { pipe } from 'remeda';

describe('addCartItem', () => {
  it('空のカートに追加', () => {
    const customId = CustomerId.generate();
    const productId = ProductId.generate();
    const cartItem = {
      productId,
      quantity: Quantity.build(1),
      price: Price.valueOf(1_000),
    };

    const [addedCart, event] = pipe(
      Cart.init(customId),
      Cart.addCartItem(cartItem),
    );
    expect(addedCart.cartItems).toStrictEqual([cartItem]);
    assert(event.eventName === 'CartItemAdded');
    expect(event.payload.cartItem).toStrictEqual(cartItem);
  });

  it('カート項目に存在しないカート項目を追加', () => {
    const customId = CustomerId.generate();
    const cartItem = {
      productId: ProductId.generate(),
      quantity: Quantity.build(6),
      price: Price.valueOf(1_000),
    };

    const targetCartItem = {
      productId: ProductId.generate(),
      quantity: Quantity.build(3),
      price: Price.valueOf(2_222),
    };
    const [addedCart, event] = pipe(
      Cart.valueOf(customId, 0, [cartItem]),
      Cart.addCartItem(targetCartItem),
    );
    const expectation = Cart.valueOf(customId, 1, [cartItem, targetCartItem]);
    expect(addedCart).toStrictEqual(expectation);
    assert(event.eventName === 'CartItemAdded');
    expect(event.payload.cartItem).toStrictEqual(targetCartItem);
  });

  it('カート項目に存在するカート項目を追加', () => {
    const customId = CustomerId.generate();
    const cartItems = [
      {
        productId: ProductId.generate(),
        quantity: Quantity.build(6),
        price: Price.valueOf(1_000),
      },
      {
        productId: ProductId.generate(),
        quantity: Quantity.build(5),
        price: Price.valueOf(2_000),
      },
    ];
    const targetCartItem = {
      productId: cartItems[1]!.productId,
      quantity: Quantity.build(3),
      price: Price.valueOf(2_222),
    };
    const [addedCart, event] = pipe(
      Cart.valueOf(customId, 0, cartItems),
      Cart.addCartItem(targetCartItem),
    );
    const expectation = Cart.valueOf(customId, 1, [
      cartItems[0]!,
      {
        ...cartItems[1]!,
        quantity: Quantity.build(8),
        price: Price.valueOf(2_222),
      },
    ]);
    expect(addedCart).toEqual(expectation);
    assert(event.eventName === 'CartItemUpdated');
    expect(event.payload.cartItem).toStrictEqual(expectation.cartItems[1]!);
  });
});

describe('removeCartItem', () => {
  it('カート項目を削除', () => {
    const customId = CustomerId.generate();
    const cartItems = [
      {
        productId: ProductId.generate(),
        quantity: Quantity.build(6),
        price: Price.valueOf(1_000),
      },
      {
        productId: ProductId.generate(),
        quantity: Quantity.build(5),
        price: Price.valueOf(2_000),
      },
    ];
    const [removedCart, event] = pipe(
      Cart.valueOf(customId, 0, cartItems),
      Cart.removeCartItem(cartItems[0]!.productId),
    );
    const expectation = Cart.valueOf(customId, 1, [cartItems[1]!]);
    expect(removedCart).toEqual(expectation);
    expect(event.eventName).toBe('CartItemRemoved');
    expect(event.payload.productId).toStrictEqual(cartItems[0]!.productId);
  });
});
