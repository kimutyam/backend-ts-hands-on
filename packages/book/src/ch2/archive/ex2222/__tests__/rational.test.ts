import { Rational } from 'ch2/archive/ex2222/rational.js';

describe('Rational', () => {
  it('add', () => {
    const a: Rational = new Rational(5, 6);
    const b: Rational = new Rational(7, 10);
    const added = a.add(b);
    expect(added.numerator).toBe(23);
    expect(added.denominator).toBe(15);
  });

  it('toString', () => {
    const a: Rational = new Rational(30, 24);
    expect(a.toString()).toBe('5/4');
  });
});
