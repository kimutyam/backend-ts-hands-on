import assert from 'node:assert';

import { Aggregate } from 'ch9/ex50/aggregate.js';
import { Cart } from 'ch9/ex50/cart.js';
import { CustomerId } from 'ch9/ex50/customerId.js';
import { Price } from 'ch9/ex50/price.js';
import { ProductId } from 'ch9/ex50/productId.js';
import { Quantity } from 'ch9/ex50/quantity.js';
import { pipe } from 'remeda';

describe('addCartItem', () => {
  it('空のカートに追加', () => {
    const customId = CustomerId.generate();
    const productId = ProductId.generate();
    const cartItem = {
      productId,
      quantity: Quantity.parse(1),
      price: Price.parse(1_000),
    };

    const result = pipe(Cart.init(customId), Cart.addCartItem(cartItem));
    assert(result.isOk());
    const [addedCart, event] = result.value;
    expect(addedCart.cartItems).toStrictEqual([cartItem]);
    assert(event.eventName === 'CartItemAdded');
    expect(event.payload.cartItem).toStrictEqual(cartItem);
  });

  it('カート項目に存在しないカート項目を追加', () => {
    const customId = CustomerId.generate();
    const cartItem = {
      productId: ProductId.generate(),
      quantity: Quantity.parse(6),
      price: Price.parse(1_000),
    };

    const targetCartItem = {
      productId: ProductId.generate(),
      quantity: Quantity.parse(3),
      price: Price.parse(2_222),
    };
    const result = pipe(
      Cart.parse({
        aggregateId: customId,
        sequenceNumber: Aggregate.InitialSequenceNumber,
        cartItems: [cartItem],
      }),
      Cart.addCartItem(targetCartItem),
    );
    assert(result.isOk());
    const [addedCart, event] = result.value;
    const expectation = Cart.parse({
      aggregateId: customId,
      sequenceNumber: 2,
      cartItems: [cartItem, targetCartItem],
    });
    expect(addedCart).toStrictEqual(expectation);
    assert(event.eventName === 'CartItemAdded');
    expect(event.payload.cartItem).toStrictEqual(targetCartItem);
  });

  it('カート項目に存在するカート項目を追加', () => {
    const customId = CustomerId.generate();
    const cartItems = [
      {
        productId: ProductId.generate(),
        quantity: Quantity.parse(6),
        price: Price.parse(1_000),
      },
      {
        productId: ProductId.generate(),
        quantity: Quantity.parse(5),
        price: Price.parse(2_000),
      },
    ];
    const targetCartItem = {
      productId: cartItems[1]!.productId,
      quantity: Quantity.parse(3),
      price: Price.parse(2_222),
    };
    const result = pipe(
      Cart.parse({
        aggregateId: customId,
        sequenceNumber: Aggregate.InitialSequenceNumber,
        cartItems,
      }),
      Cart.addCartItem(targetCartItem),
    );
    assert(result.isOk());
    const [addedCart, event] = result.value;
    const expectation = Cart.parse({
      aggregateId: customId,
      sequenceNumber: 2,
      cartItems: [
        cartItems[0]!,
        {
          ...cartItems[1]!,
          quantity: Quantity.parse(8),
          price: Price.parse(2_222),
        },
      ],
    });
    expect(addedCart).toEqual(expectation);
    assert(event.eventName === 'CartItemUpdated');
    expect(event.payload.cartItem).toStrictEqual(expectation.cartItems[1]);
  });
});

describe('removeCartItem', () => {
  it('カート項目を削除', () => {
    const customId = CustomerId.generate();
    const cartItems = [
      {
        productId: ProductId.generate(),
        quantity: Quantity.parse(6),
        price: Price.parse(1_000),
      },
      {
        productId: ProductId.generate(),
        quantity: Quantity.parse(5),
        price: Price.parse(2_000),
      },
    ];
    const [removedCart, event] = pipe(
      Cart.parse({
        aggregateId: customId,
        sequenceNumber: Aggregate.InitialSequenceNumber,
        cartItems,
      }),
      Cart.removeCartItem(cartItems[0]!.productId),
    );
    const expectation = Cart.parse({
      aggregateId: customId,
      sequenceNumber: 2,
      cartItems: [cartItems[1]!],
    });
    expect(removedCart).toEqual(expectation);
    expect(event.eventName).toBe('CartItemRemoved');
    expect(event.payload.productId).toStrictEqual(cartItems[0]!.productId);
  });
});
