import { pipe } from 'remeda';
import { Cart } from '../cart';
import { CustomerId } from '../customerId';
import { Price } from '../price';
import { ProductId } from '../productId';
import { Quantity } from '../quantity';

describe('addCartItem', () => {
  it('空のカートに追加', () => {
    const customId = CustomerId.generate();
    const productId = ProductId.generate();
    const cartItem = {
      productId,
      quantity: Quantity.build(1),
      price: Price.build(1_000),
    };

    const addedCart = pipe(Cart.initBuild(customId), Cart.addCartItem(cartItem));
    expect(addedCart.cartItems).toEqual([cartItem]);
  });

  it('カート項目に存在しないカート項目を追加', () => {
    const customId = CustomerId.generate();
    const cartItem = {
      productId: ProductId.generate(),
      quantity: Quantity.build(6),
      price: Price.build(1_000),
    };

    const targetCartItem = {
      productId: ProductId.generate(),
      quantity: Quantity.build(3),
      price: Price.build(2_222),
    };
    const addedCart = pipe(Cart.build(customId, [cartItem]), Cart.addCartItem(targetCartItem));
    const expectation = Cart.build(customId, [cartItem, targetCartItem]);
    expect(addedCart).toEqual(expectation);
  });

  it('カート項目に存在するカート項目を追加', () => {
    const customId = CustomerId.generate();
    const cartItems = [
      {
        productId: ProductId.generate(),
        quantity: Quantity.build(6),
        price: Price.build(1_000),
      },
      {
        productId: ProductId.generate(),
        quantity: Quantity.build(5),
        price: Price.build(2_000),
      },
    ];
    const targetCartItem = {
      productId: cartItems[1]!.productId,
      quantity: Quantity.build(3),
      price: Price.build(2_222),
    };
    const addedCart = pipe(Cart.build(customId, cartItems), Cart.addCartItem(targetCartItem));
    const expectation = Cart.build(customId, [
      cartItems[0]!,
      {
        ...cartItems[1]!,
        quantity: Quantity.build(8),
        price: Price.build(2_222),
      },
    ]);
    expect(addedCart).toEqual(expectation);
  });
});

describe('removeCartItem', () => {
  it('カート項目を削除', () => {
    const customId = CustomerId.generate();
    const cartItems = [
      {
        productId: ProductId.generate(),
        quantity: Quantity.build(6),
        price: Price.build(1_000),
      },
      {
        productId: ProductId.generate(),
        quantity: Quantity.build(5),
        price: Price.build(2_000),
      },
    ];
    const removedCart = pipe(
      Cart.build(customId, cartItems),
      Cart.removeCartItem(cartItems[0]!.productId),
    );
    const expectation = Cart.build(customId, [cartItems[1]!]);
    expect(removedCart).toEqual(expectation);
  });
});
