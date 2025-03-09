import type { Rational } from 'ch2/ex51/rational.js';

type RationalType = typeof Rational;

const createInstance = (
  ctor: RationalType,
  numerator: number,
  denominator: number,
): Rational =>
  // eslint-disable-next-line new-cap
  new ctor(numerator, denominator);

export { createInstance };
