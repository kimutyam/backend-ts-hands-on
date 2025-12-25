import assert from 'node:assert';

interface Rational {
  readonly reducedNumerator: number;
  readonly reducedDenominator: number;
}

const calculateGcd = (a: number, b: number): number =>
  b === 0 ? a : calculateGcd(b, a % b);

// 1
const build = (numerator: number, denominator: number): Rational => {
  assert(denominator !== 0, '分母は0以外になるようにしてください');
  assert(Number.isInteger(numerator), '分子は整数になるようにしてください');
  assert(Number.isInteger(denominator), '分母は整数になるようにしてください');
  const gcd = calculateGcd(numerator, denominator);
  return {
    reducedNumerator: numerator / gcd,
    reducedDenominator: denominator / gcd,
  };
};

// 2
const add = (a: Rational, b: Rational): Rational =>
  build(
    a.reducedNumerator * b.reducedDenominator +
      b.reducedNumerator * a.reducedDenominator,
    a.reducedDenominator * b.reducedDenominator,
  );

const Rational = {
  build,
  add,
};

export type { Rational };
