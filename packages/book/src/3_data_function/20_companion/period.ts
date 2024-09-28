import { addDays } from 'date-fns/fp';
import { pipe } from 'remeda';

interface Period {
  readonly start: Date;
  readonly end: Date;
}

// NOTE: 振る舞いの定義は割愛

const Period = {
  build: (start: Date, periodDate: number): Period => ({
    start,
    end: pipe(start, addDays(periodDate)),
  }),
} as const;

// 型と値の両方を公開します
export { Period };
