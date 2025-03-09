import { Aggregate } from '9_always_valid_domain_model/50/aggregate.js';
import { Cart } from '9_always_valid_domain_model/50/cart.js';
import { CustomerId } from '9_always_valid_domain_model/50/customerId.js';
import { OrderId } from '9_always_valid_domain_model/50/orderId.js';
import { Price } from '9_always_valid_domain_model/50/price.js';
import { Product } from '9_always_valid_domain_model/50/product.js';
import { ProductId } from '9_always_valid_domain_model/50/productId.js';
import { Quantity } from '9_always_valid_domain_model/50/quantity.js';
import { requestOrder } from '9_always_valid_domain_model/50/requestOrder.js';
import { describe, expect } from 'vitest';

describe('requestOrder', () => {
  it('should place an order', () => {
    const products: Array<Product> = [
      Product.build({
        aggregateId: ProductId.generate(),
        sequenceNumber: Aggregate.InitialSequenceNumber,
        name: 'product1',
        price: Price.build(1_001),
      }),
      Product.build({
        aggregateId: ProductId.generate(),
        sequenceNumber: Aggregate.InitialSequenceNumber,
        name: 'product2',
        price: Price.build(2_001),
      }),
    ];

    const cart = Cart.build({
      aggregateId: CustomerId.generate(),
      sequenceNumber: Aggregate.InitialSequenceNumber,
      cartItems: [
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
    });

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
