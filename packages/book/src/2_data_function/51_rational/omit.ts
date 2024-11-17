import type { Rational } from './rational';

type Omitted = Omit<Rational, 'numerator'>;

export type { Omitted };
