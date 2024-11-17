import { createInstance } from '../createInstance';
import { Rational } from '../rational';

it('createInstance', () => {
  const rational: Rational = createInstance(Rational, 2, 4);
  expect(rational.numerator).toBe(1);
  expect(rational.denominator).toBe(2);
});
