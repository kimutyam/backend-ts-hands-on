import { isWithin } from 'ch2/ex8/period.js';
import type { Period } from 'ch2/ex15/period.js';

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
