import { monotonicFactory, decodeTime, isValid } from 'ulidx';
import type { Nominal } from '../nominal';
import { Generator, Invariants } from '../nominal';

const name = 'DomainEventId';
export type DomainEventId = Nominal<typeof name, string>;
const invariants = Invariants.buildSingle<DomainEventId>(
  name,
  (value) => isValid(value),
  'ULIDで指定ください',
);

export const DomainEventId = {
  ...Generator<DomainEventId>(name, invariants)(monotonicFactory()),
  getTimestamp: (id: DomainEventId): number => decodeTime(id.value),
} as const;
