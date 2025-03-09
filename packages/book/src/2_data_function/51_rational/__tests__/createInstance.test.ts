import { createInstance } from '2_data_function/51_rational/createInstance.js';
import { Rational } from '2_data_function/51_rational/rational.js';

it('createInstance', () => {
  const rational: Rational = createInstance(Rational, 2, 4);
  expect(rational.numerator).toBe(1);
  expect(rational.denominator).toBe(2);
});
