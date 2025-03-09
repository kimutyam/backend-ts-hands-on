import assert from 'node:assert';

// インスタンス型は、numeratorとdenominator、add、toStringメソッドを持つ <- 直感的でない
// 振る舞いも含まれてしまう。
class Rational {
  private readonly gcd: number;

  public readonly numerator: number;

  public readonly denominator: number;

  constructor(initNumerator: number, initDenominator: number) {
    assert(initDenominator !== 0);
    assert(Number.isInteger(initNumerator));
    assert(Number.isInteger(initDenominator));
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
    return `${this.numerator}/${this.denominator}`;
  }

  // 最大公約数を求める
  private calculateGcd(a: number, b: number): number {
    return b === 0 ? a : this.calculateGcd(b, a % b);
  }
}

export { Rational };
