import { type Nominal, SafeBuilder, Invariants } from '../../util/nominal';
import { InvariantUnit } from '../../util/nominal';

const name = 'maxNumberOfParticipants';
export type MaxNumberOfParticipants = Nominal<typeof name, number>;
const buildInvariantUnit = InvariantUnit<MaxNumberOfParticipants>;
const invariants = Invariants.build<MaxNumberOfParticipants>(
  name,
  buildInvariantUnit((value) => value > 0, '0より大きい数値にしてください'),
  buildInvariantUnit((value) => Number.isInteger(value), '整数で指定ください'),
);
export const MaxNumberOfParticipants = {
  ...SafeBuilder<MaxNumberOfParticipants>(name, invariants),
} as const;
