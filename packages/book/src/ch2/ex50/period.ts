import { addDays } from 'date-fns/fp';
import * as R from 'remeda';

interface Period {
  readonly start: Date;
  readonly end: Date;
}

const build = (start: Date, periodDays: number): Period => ({
  start,
  end: R.pipe(start, addDays(periodDays)),
});

const Period = {
  build, // 1
} as const;

// 3
export { Period };
