import { monotonicFactory, isValid } from 'ulidx';
import type { Nominal } from '../../util/nominal';
import { Generator, Transformer, Invariants } from '../../util/nominal';

const name = 'ConferenceId';
type ConferenceId = Nominal<typeof name, string>;
const invariants = Invariants.buildSingle<ConferenceId>(
  name,
  (value) => isValid(value),
  'ULIDで指定ください',
);

const ConferenceId = {
  ...Transformer<ConferenceId>(name, invariants),
  ...Generator<ConferenceId>(name, invariants)(monotonicFactory()),
} as const;

export { ConferenceId };
