import type { Rational } from './rational';

type PublicProperties<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

// { readonly numerator: number; readonly denominator: number; }
type PublicFieldsOfRational = Pick<Rational, PublicProperties<Rational>>;

export type { PublicFieldsOfRational };
