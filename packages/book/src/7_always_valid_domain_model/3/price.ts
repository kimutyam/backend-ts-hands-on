import assert from 'node:assert';

type Price = number;

const assertPrice = (price: number): void => {
  assert(Number.isInteger(price), '商品価格は整数で指定してください');
  assert(price >= 1_000, '商品価格は1000円以上にしてください');
  assert(price <= 100_000, '商品価格は10万円以下にしてください');
};

const build = (price: Price): Price => {
  assertPrice(price);
  return price;
};

const Price = {
  build,
} as const;

export { Price };
