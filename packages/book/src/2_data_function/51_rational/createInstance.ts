import type { Rational } from '2_data_function/51_rational/rational.js';

type RationalType = typeof Rational;

const createInstance = (
  ctor: RationalType,
  numerator: number,
  denominator: number,
): Rational =>
  // eslint-disable-next-line new-cap
  new ctor(numerator, denominator);

export { createInstance };
