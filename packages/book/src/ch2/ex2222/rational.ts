import assert from 'node:assert';

class Rational {
  private readonly gcd: number;

  public readonly numerator: number; // 1

  public readonly denominator: number; // 1

  constructor(initNumerator: number, initDenominator: number) {
    assert(initDenominator !== 0); // 2
    assert(Number.isInteger(initNumerator)); // 2
    assert(Number.isInteger(initDenominator)); // 2
    this.gcd = this.calculateGcd(initNumerator, initDenominator); // 3
    this.numerator = initNumerator / this.gcd; // 3
    this.denominator = initDenominator / this.gcd; // 3
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
