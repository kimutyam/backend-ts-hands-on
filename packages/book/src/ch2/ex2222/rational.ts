import assert from 'node:assert';

class Rational {
  private readonly gcd: number;

  // 1
  public readonly numerator: number;

  // 1
  public readonly denominator: number;

  constructor(initNumerator: number, initDenominator: number) {
    // 2
    assert(initDenominator !== 0);
    // 2
    assert(Number.isInteger(initNumerator));
    // 2
    assert(Number.isInteger(initDenominator));
    // 3
    this.gcd = this.calculateGcd(initNumerator, initDenominator);
    this.numerator = initNumerator / this.gcd;
    this.denominator = initDenominator / this.gcd;
  }

  // 4
  add(that: Rational): Rational {
    return new Rational(
      this.numerator * that.denominator + that.numerator * this.denominator,
      this.denominator * that.denominator,
    );
  }

  // 5
  toString(): string {
    return `${this.numerator}/${this.denominator}`;
  }

  private calculateGcd(a: number, b: number): number {
    return b === 0 ? a : this.calculateGcd(b, a % b);
  }
}

export { Rational };
