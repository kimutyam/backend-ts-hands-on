import type { Period } from '../ex15/period.js';
import { contains } from './period.js';

interface Schedule {
  readonly entryPeriod: Period;
  readonly lotteryPeriod: Period;
}

const containsSchedule = (schedule: Schedule, dateToCompare: Date): boolean => {
  const { entryPeriod, lotteryPeriod } = schedule;
  return contains(
    {
      start: entryPeriod.start,
      end: lotteryPeriod.end,
    },
    dateToCompare,
  );
};

export { containsSchedule, type Schedule };
