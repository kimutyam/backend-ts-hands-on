import { addDays } from 'date-fns/fp';
import * as R from 'remeda';

interface Period {
  readonly start: Date;
  readonly end: Date;
}

const Period = {
  // 1
  build: (start: Date, periodDate: number): Period => ({
    start,
    end: R.pipe(start, addDays(periodDate)),
  }),
} as const; // 2

// 3
export { Period };
