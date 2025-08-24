import type { Rational } from 'ch2/archive/ex2222/rational.js';

type Omitted = Omit<Rational, 'numerator'>;

export type { Omitted };
