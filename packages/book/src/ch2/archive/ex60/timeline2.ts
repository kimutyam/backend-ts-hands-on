import * as R from 'remeda';

import { Period } from '../../ex55/period.js';

interface Timeline {
  readonly entryPeriod: Period;
  readonly lotteryEndDate: Period['end'];
}

const contains = (timeline: Timeline, dateToCompare: Date): boolean =>
  R.pipe(
    {
      start: timeline.entryPeriod.start,
      end: timeline.lotteryEndDate,
    },
    Period.contains(dateToCompare),
  );

const Timeline = {
  contains,
} as const;

export { Timeline };
