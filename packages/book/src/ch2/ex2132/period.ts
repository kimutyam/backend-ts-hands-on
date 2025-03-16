import { addDays } from 'date-fns/fp';
import { pipe } from 'remeda';

interface Period {
  readonly start: Date;
  readonly end: Date;
}

const Period = {
  // 1
  of: (start: Date, periodDate: number): Period => ({
    start,
    end: pipe(start, addDays(periodDate)),
  }),
} as const; // 2

// 3
export { Period };
