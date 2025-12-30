import { addDays, addHours } from 'date-fns/fp';
import * as R from 'remeda';

interface Period {
  readonly start: Date;
  readonly end: Date;
}

const postpone =
  (delayDays: number, delayHours: number) =>
  (period: Period): Period => {
    const { start, end } = period;
    return {
      start: R.pipe(start, addDays(delayDays), addHours(delayHours)),
      end: R.pipe(end, addDays(delayDays), addHours(delayHours)),
    };
  };

export { postpone, type Period };
