import type { Period } from '../ex15/period.js';
import { isWithin } from './period.js';

interface Schedule {
  readonly entryPeriod: Period;
  readonly lotteryPeriod: Period;
}

const isWithinSchedule = (schedule: Schedule, dateToCompare: Date): boolean => {
  const { entryPeriod, lotteryPeriod } = schedule;
  return isWithin(
    {
      start: entryPeriod.start,
      end: lotteryPeriod.end,
    },
    dateToCompare,
  );
};

export { isWithinSchedule, type Schedule };
