import * as R from 'remeda';

import { Period } from '../../ex55/period.js';

interface Timeline {
  readonly entryPeriod: Period;
  readonly lotteryEndDate: Period['end'];
}

const isWithin = (timeline: Timeline, dateToCompare: Date): boolean =>
  R.pipe(
    {
      start: timeline.entryPeriod.start,
      end: timeline.lotteryEndDate,
    },
    Period.isWithin(dateToCompare),
  );

const Timeline = {
  isWithin,
} as const;

export { Timeline };
