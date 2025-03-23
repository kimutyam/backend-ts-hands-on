import assert from 'node:assert';

class Rational {
  private readonly gcd: number;

  public readonly numerator: number;

  public readonly denominator: number;

  constructor(initNumerator: number, initDenominator: number) {
    assert(initDenominator !== 0); // 1
    assert(Number.isInteger(initNumerator)); // 1
    assert(Number.isInteger(initDenominator)); // 1
    this.gcd = this.calculateGcd(initNumerator, initDenominator);
    this.numerator = initNumerator / this.gcd;
    this.denominator = initDenominator / this.gcd;
  }

  add(that: Rational): Rational {
    return new Rational(
      this.numerator * that.denominator + that.numerator * this.denominator,
      this.denominator * that.denominator,
    );
  }

  toString(): string {
    return `${this.numerator.toString()}/${this.denominator.toString()}`;
  }

  private calculateGcd(a: number, b: number): number {
    return b === 0 ? a : this.calculateGcd(b, a % b);
  }
}

export { Rational };
