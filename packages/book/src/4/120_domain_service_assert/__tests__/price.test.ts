import { pipe } from 'remeda';
import { DiscountRate } from '../discountRate';
import { Price } from '../price';

describe('a', () => {
  it('a', () => {
    const price = Price.build(777);
    const discountRate = DiscountRate.build(30);
    const discountedPrice = pipe(price, Price.discount(discountRate));
    expect(discountedPrice.value).toBe(543);
  });
});
