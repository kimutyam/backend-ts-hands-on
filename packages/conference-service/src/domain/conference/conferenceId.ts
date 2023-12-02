import { monotonicFactory, isValid } from 'ulidx';
import type { Nominal } from '../../util/nominal';
import { Generator, SafeBuilder, Invariants } from '../../util/nominal';

const name = 'ConferenceId';
type ConferenceId = Nominal<typeof name, string>;
const invariants = Invariants.buildSingle<ConferenceId>(
  name,
  (value) => isValid(value),
  'ULIDで指定ください',
);

const ConferenceId = {
  ...SafeBuilder<ConferenceId>(name, invariants),
  ...Generator<ConferenceId>(name, invariants)(monotonicFactory()),
} as const;

export { ConferenceId };
