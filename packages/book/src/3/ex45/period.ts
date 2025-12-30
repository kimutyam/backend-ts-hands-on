import { addDays } from 'date-fns/fp';
import * as R from 'remeda';

interface Period {
  readonly start: Date;
  readonly end: Date;
}

const Period = {
  // 1
  build: (start: Date, periodDays: number): Period => ({
    start,
    end: R.pipe(start, addDays(periodDays)),
  }),
} as const; // 2

// 3
export { Period };
