import { describe, expect } from 'vitest';

import { Aggregate } from '#/app/domain/aggregate.js';
import { Cart } from '#/app/domain/cart/cart.js';
import { Quantity } from '#/app/domain/cart/quantity.js';
import { CustomerId } from '#/app/domain/customer/customerId.js';
import { OrderId } from '#/app/domain/order/orderId.js';
import { requestOrder } from '#/app/domain/order/requestOrder.js';
import { Price } from '#/app/domain/product/price.js';
import { Product } from '#/app/domain/product/product.js';
import { ProductId } from '#/app/domain/product/productId.js';

describe('requestOrder', () => {
  it('should place an order', () => {
    const products: Array<Product> = [
      Product.parse({
        aggregateId: ProductId.generate(),
        sequenceNumber: Aggregate.InitialSequenceNumber,
        name: 'product1',
        price: Price.parse(1_001),
      }),
      Product.parse({
        aggregateId: ProductId.generate(),
        sequenceNumber: Aggregate.InitialSequenceNumber,
        name: 'product2',
        price: Price.parse(2_001),
      }),
    ];

    const cart = Cart.parse({
      aggregateId: CustomerId.generate(),
      sequenceNumber: Aggregate.InitialSequenceNumber,
      cartItems: [
        {
          productId: products[0]!.aggregateId,
          quantity: Quantity.parse(1),
          price: Price.parse(1_000),
        },
        {
          productId: products[1]!.aggregateId,
          quantity: Quantity.parse(1),
          price: Price.parse(2_000),
        },
      ],
    });

    const [order, orderRequested, cartAfterOrder, cartCleared] = requestOrder(
      cart,
      products,
      OrderId.generate,
    );

    expect(order.items).toStrictEqual([
      {
        productId: products[0]!.aggregateId,
        quantity: Quantity.parse(1),
        price: Price.parse(1_001),
      },
      {
        productId: products[1]!.aggregateId,
        quantity: Quantity.parse(1),
        price: Price.parse(2_001),
      },
    ]);
    expect(orderRequested.sequenceNumber).toEqual(1);
    expect(orderRequested.payload).toEqual({
      customerId: cart.aggregateId,
      items: [
        {
          productId: products[0]!.aggregateId,
          quantity: Quantity.parse(1),
          price: Price.parse(1_001),
        },
        {
          productId: products[1]!.aggregateId,
          quantity: Quantity.parse(1),
          price: Price.parse(2_001),
        },
      ],
    });
    expect(cartAfterOrder.cartItems).toHaveLength(0);
    expect(cartCleared.payload.reason).toEqual('OnOrder');
    expect(cartCleared.sequenceNumber).toEqual(2);
  });
});
