import assert from 'node:assert';
import { reserveStock } from '../reserveStock';
import { StockReservationError } from '../stockReservationError';

describe('reserveStock', () => {
  const stocks = [
    {
      productId: 'product-1',
      stock: 3,
    },
    {
      productId: 'product-2',
      stock: 2,
    },
  ];

  it('成功', () => {
    const order = {
      orderId: 'order-1',
      items: [
        {
          productId: 'product-1',
          quantity: 2,
        },
        {
          productId: 'product-2',
          quantity: 1,
        },
      ],
    };
    const result = reserveStock(order, stocks);
    assert(result.isOk());
    expect(result.value).toStrictEqual([
      {
        productId: 'product-1',
        stock: 1,
      },
      {
        productId: 'product-2',
        stock: 1,
      },
    ]);
  });

  it('失敗', () => {
    const order = {
      orderId: 'order-1',
      items: [
        {
          productId: 'product-1',
          quantity: 2,
        },
        {
          productId: 'product-2',
          quantity: 3,
        },
        {
          productId: 'product-3',
          quantity: 10,
        },
      ],
    };
    const result = reserveStock(order, stocks);
    assert(result.isErr());
    expect(result.error).toStrictEqual(
      new StockReservationError('order-1', [
        { productId: 'product-2', diff: -1 },
        { productId: 'product-3', diff: -10 },
      ]),
    );
  });
});
