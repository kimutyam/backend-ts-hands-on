import { OrderItem } from '../orderItem';
import { OrderQuantity } from '../orderQuantity';

describe('等価性のテスト', () => {
  const x = OrderItem.build({ name: 'apple', price: 100 }, OrderQuantity.build(10));

  it('全てのプロパティが等価であれば、値オブジェクトは等価である', () => {
    expect(OrderItem.equals(x, x)).toBeTruthy();
  });

  it('1つでも等価でないプロパティがあれば、値オブジェクトは等価ではない', () => {
    expect(
      OrderItem.equals(x, OrderItem.build({ name: 'apple', price: 100 }, OrderQuantity.build(1))),
    ).toBeFalsy();
    expect(
      OrderItem.equals(x, OrderItem.build({ name: 'orange', price: 100 }, OrderQuantity.build(10))),
    ).toBeFalsy();
  });
});
