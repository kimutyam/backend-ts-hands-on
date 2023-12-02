import { addDays, isAfter, isEqual } from 'date-fns';
import type { Nominal } from '../../util/nominal';
import { Transformer, Invariants } from '../../util/nominal';
import type { Period } from './period';

const name = 'LotteryPeriod';
export type LotteryPeriod = Nominal<typeof name, Period>;

const invariants = Invariants.buildSingle<LotteryPeriod>(
  name,
  ({ startDateTime, endDateTime }) => {
    const addedStartDate = addDays(startDateTime, 3);
    return isEqual(addedStartDate, endDateTime) || isAfter(addedStartDate, endDateTime);
  },
  '期間を3日以上設けてください',
);

export const LotteryPeriod = {
  ...Transformer<LotteryPeriod>(name, invariants),
} as const;
