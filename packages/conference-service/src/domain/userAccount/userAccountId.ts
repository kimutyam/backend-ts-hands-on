import { monotonicFactory, isValid } from 'ulidx';
import type { Nominal } from '../../util/nominal';
import { Generator, SafeBuilder, Invariants } from '../../util/nominal';

const name = 'UserAccountId';
export type UserAccountId = Nominal<typeof name, string>;
const invariants = Invariants.buildSingle<UserAccountId>(
  name,
  (value) => isValid(value),
  'ULIDで指定ください',
);

export const UserAccountId = {
  ...SafeBuilder<UserAccountId>(name, invariants),
  ...Generator<UserAccountId>(name, invariants)(monotonicFactory()),
} as const;
