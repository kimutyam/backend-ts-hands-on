import assert from 'node:assert';

interface Rational {
  readonly numerator: number;
  readonly denominator: number;
}

const calculateGcd = (a: number, b: number): number =>
  b === 0 ? a : calculateGcd(b, a % b);

const build = (initNumerator: number, initDenominator: number): Rational => {
  assert(initDenominator !== 0);
  assert(Number.isInteger(initNumerator));
  assert(Number.isInteger(initDenominator));
  const gcd = calculateGcd(initNumerator, initDenominator);
  return {
    numerator: initNumerator / gcd,
    denominator: initDenominator / gcd,
  };
};

const add = (a: Rational, b: Rational): Rational =>
  build(
    a.numerator * b.denominator + b.numerator * a.denominator,
    a.denominator * b.denominator,
  );

const Rational = {
  build,
  add,
};

export type { Rational };
