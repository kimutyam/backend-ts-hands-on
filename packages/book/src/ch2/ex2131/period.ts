import { addDays } from 'date-fns/fp';
import * as R from 'remeda';

interface Period {
  readonly start: Date;
  readonly end: Date;
}

// 1
const of = (start: Date, periodDays: number): Period => ({
  start,
  end: R.pipe(start, addDays(periodDays)),
});

// 2
export { of, type Period };
