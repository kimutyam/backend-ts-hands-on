import { createInstance } from 'ch2/archive/ex2222/createInstance.js';
import { Rational } from 'ch2/archive/ex2222/rational.js';

it('createInstance', () => {
  const rational: Rational = createInstance(Rational, 2, 4);
  expect(rational.numerator).toBe(1);
  expect(rational.denominator).toBe(2);
});
