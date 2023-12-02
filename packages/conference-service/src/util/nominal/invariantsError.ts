import type { NonEmptyReadonlyArray } from '../nonEmptyReadonlyArray';
import type { AnyNominal, NominalName, NominalValue } from './nominal';

export class InvariantsError<N extends AnyNominal> extends Error {
  constructor(
    public nominalName: NominalName<N>,
    public issues: NonEmptyReadonlyArray<string>,
    public value: NominalValue<N>,
  ) {
    const message = issues.join('\n');
    super(message);
    this.name = 'InvariantsError';
  }
}
