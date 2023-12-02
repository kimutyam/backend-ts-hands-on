import type { Result } from '../result';
import type { InvariantsError } from './invariantsError';
import type { AnyNominal, NNominal } from './nominal';

export type NominalResult<N extends AnyNominal> = Result<InvariantsError<N>, NNominal<N>>;
