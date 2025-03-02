import { Item } from '../item.js';

describe('等価性のテスト', () => {
  const x = {
    product: { name: 'apple', price: 100 },
    quantity: 10,
  };

  it('全てのプロパティが等価であれば、値オブジェクトは等価である', () => {
    expect(Item.equals(x, x)).toBeTruthy();
  });

  it('1つでも等価でないプロパティがあれば、値オブジェクトは等価ではない', () => {
    expect(
      Item.equals(x, {
        product: { name: 'apple', price: 100 },
        quantity: 1,
      }),
    ).toBeFalsy();
    expect(
      Item.equals(x, {
        product: { name: 'orenge', price: 100 },
        quantity: 10,
      }),
    ).toBeFalsy();
  });
});
