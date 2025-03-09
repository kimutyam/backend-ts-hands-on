import type { Rational } from 'ch2/ex51/rational.js';

type Omitted = Omit<Rational, 'numerator'>;

export type { Omitted };
