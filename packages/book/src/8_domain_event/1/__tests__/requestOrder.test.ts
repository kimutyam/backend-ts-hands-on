import { Aggregate } from '8_domain_event/1/aggregate.js';
import { Cart } from '8_domain_event/1/cart.js';
import { CustomerId } from '8_domain_event/1/customerId.js';
import { OrderId } from '8_domain_event/1/orderId.js';
import { Price } from '8_domain_event/1/price.js';
import { Product } from '8_domain_event/1/product.js';
import { ProductId } from '8_domain_event/1/productId.js';
import { Quantity } from '8_domain_event/1/quantity.js';
import { requestOrder } from '8_domain_event/1/requestOrder.js';
import { describe, expect } from 'vitest';

describe('requestOrder', () => {
  it('should place an order', () => {
    const products: Array<Product> = [
      Product.build(
        ProductId.generate(),
        Aggregate.InitialSequenceNumber,
        'product1',
        Price.build(1_001),
      ),
      Product.build(
        ProductId.generate(),
        Aggregate.InitialSequenceNumber,
        'product2',
        Price.build(2_001),
      ),
    ];

    const cart = Cart.build(
      CustomerId.generate(),
      Aggregate.InitialSequenceNumber,
      [
        {
          productId: products[0]!.aggregateId,
          quantity: Quantity.build(1),
          price: Price.build(1_000),
        },
        {
          productId: products[1]!.aggregateId,
          quantity: Quantity.build(1),
          price: Price.build(2_000),
        },
      ],
    );

    const [
      order,
      orderRequested,
      cartAfterOrder,
      cartCleared,
    ] = requestOrder(cart, products, OrderId.generate);

    expect(order.items).toStrictEqual([
      {
        productId: products[0]!.aggregateId,
        quantity: Quantity.build(1),
        price: Price.build(1_001),
      },
      {
        productId: products[1]!.aggregateId,
        quantity: Quantity.build(1),
        price: Price.build(2_001),
      },
    ]);
    expect(orderRequested.sequenceNumber).toEqual(1);
    expect(orderRequested.payload).toEqual({
      customerId: cart.aggregateId,
      items: [
        {
          productId: products[0]!.aggregateId,
          quantity: Quantity.build(1),
          price: Price.build(1_001),
        },
        {
          productId: products[1]!.aggregateId,
          quantity: Quantity.build(1),
          price: Price.build(2_001),
        },
      ],
    });
    expect(cartAfterOrder.cartItems).toHaveLength(0);
    expect(cartCleared.payload.reason).toEqual('OnOrder');
    expect(cartCleared.sequenceNumber).toEqual(2);
  });
});
