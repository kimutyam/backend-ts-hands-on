// インスタンスを生成し、インスタンス型の値を取得
import { Rational } from 'ch2/ex2222/rational.js';

const rational: Rational = new Rational(5, 6);
// NG: 型エラー
// インスタンスメソッドのaddは、Rationalのインスタンス型のサブタイプをを引数に渡す必要があります。
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const added = rational.add({
  numerator: 7,
  denominator: 10,
});

const added2 = rational.add(rational);

console.log(added, added2);
