import type { Rational } from './rational.js';

type Omitted = Omit<Rational, 'numerator'>;

export type { Omitted };
