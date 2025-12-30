import { createInstance } from '../createInstance.js';
import { Rational } from '../rational.js';

it('createInstance', () => {
  const rational: Rational = createInstance(Rational, 2, 4);
  expect(rational.numerator).toBe(1);
  expect(rational.denominator).toBe(2);
});
