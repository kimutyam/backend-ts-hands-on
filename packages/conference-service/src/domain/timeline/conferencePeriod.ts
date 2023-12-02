import { isEqual, addHours, isAfter } from 'date-fns';
import type { Nominal } from '../../util/nominal';
import { SafeBuilder, Invariants } from '../../util/nominal';
import type { Period } from './period';

const name = 'ConferencePeriod';
export type ConferencePeriod = Nominal<typeof name, Period>;
const invariants = Invariants.buildSingle<ConferencePeriod>(
  name,
  ({ startDateTime, endDateTime }) => {
    const addedStartDate = addHours(startDateTime, 2);
    return isEqual(addedStartDate, endDateTime) || isAfter(addedStartDate, endDateTime);
  },
  '期間を2日以上設けてください',
);
export const ConferencePeriod = {
  ...SafeBuilder<ConferencePeriod>(name, invariants),
} as const;
