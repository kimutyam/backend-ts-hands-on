import { addDays, isAfter, isEqual } from 'date-fns';
import type { Nominal } from '../../util/nominal';
import { Builder, SafeBuilder, Invariants } from '../../util/nominal';
import type { Period } from './period';

const name = 'EntryPeriod';
export type EntryPeriod = Nominal<typeof name, Period>;
const invariants = Invariants.buildSingle<EntryPeriod>(
  name,
  ({ startDateTime, endDateTime }) => {
    const addedStartDate = addDays(startDateTime, 3);
    return isEqual(addedStartDate, endDateTime) || isAfter(addedStartDate, endDateTime);
  },
  '期間を3日以上設けてください',
);
export const EntryPeriod = {
  ...Builder<EntryPeriod>(name),
  ...SafeBuilder<EntryPeriod>(name, invariants),
} as const;
