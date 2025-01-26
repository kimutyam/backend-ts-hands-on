import type { Rational } from './rational.js';

type PublicProperties<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

// { readonly numerator: number; readonly denominator: number; }
type PublicFieldsOfRational = Pick<Rational, PublicProperties<Rational>>;

export type { PublicFieldsOfRational };
