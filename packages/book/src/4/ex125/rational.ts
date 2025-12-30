import assert from 'node:assert';

class Rational {
  // 最大公約数 (Greatest Common Divisor)
  private readonly gcd: number;

  // 約分された分子
  public readonly reducedNumerator: number;

  // 約分された分母
  public readonly reducedDenominator: number;

  // 1
  private calculateGcd(a: number, b: number): number {
    const r = a % b;
    return b === 0 ? a : this.calculateGcd(b, r);
  }

  /**
   * コンストラクタ
   * @param numerator 分子
   * @param denominator 分母
   */
  constructor(numerator: number, denominator: number) {
    assert(denominator !== 0, '分母は0以外になるようにしてください'); // 2
    assert(Number.isInteger(numerator), '分子は整数になるようにしてください'); // 2
    assert(Number.isInteger(denominator), '分母は整数になるようにしてください'); // 2
    this.gcd = this.calculateGcd(numerator, denominator);
    this.reducedNumerator = numerator / this.gcd;
    this.reducedDenominator = denominator / this.gcd;
  }

  add(that: Rational): Rational {
    // 3
    return new Rational(
      this.reducedNumerator * that.reducedDenominator +
        that.reducedNumerator * this.reducedDenominator,
      this.reducedDenominator * that.reducedDenominator,
    );
  }
}

export { Rational };
