import { type Nominal, Transformer, Invariants } from '../../util/nominal';
import { InvariantUnit } from '../../util/nominal';

const name = 'maxNumberOfParticipants';
export type MaxNumberOfParticipants = Nominal<typeof name, number>;
const buildInvariantUnit = InvariantUnit<MaxNumberOfParticipants>;
const invariants = Invariants.buildMulti<MaxNumberOfParticipants>(
  name,
  buildInvariantUnit((value) => value > 0, '0より大きい数値をしてください'),
  buildInvariantUnit((value) => Number.isInteger(value), '整数で指定ください'),
);
export const MaxNumberOfParticipants = {
  ...Transformer<MaxNumberOfParticipants>(name, invariants),
} as const;
