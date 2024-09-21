import { isBefore, isAfter, isEqual, addDays, addHours } from 'date-fns/fp';
import { pipe } from 'remeda';

interface Period {
  readonly start: Date;
  readonly end: Date;
}

const isSameOrAfter =
  (dateToCompare: Date) =>
  (date: Date): boolean =>
    isAfter(date, dateToCompare) || isEqual(date, dateToCompare);

const isSameOrBefore =
  (dateToCompare: Date) =>
  (date: Date): boolean =>
    isBefore(date, dateToCompare) || isEqual(date, dateToCompare);

// 期間内かどうか
const between =
  (dateToCompare: Date) =>
  ({ start, end }: Period): boolean =>
    isSameOrAfter(dateToCompare)(start) && isSameOrBefore(dateToCompare)(end);

const postpone =
  (delayDays: number, delayHours: number) =>
  ({ start, end }: Period): Period => ({
    start: pipe(start, addDays(delayDays), addHours(delayHours)),
    end: pipe(end, addDays(delayDays), addHours(delayHours)),
  });

const build = (start: Date, periodDate: number): Period => ({
  start,
  end: addDays(periodDate)(start),
});

const Period = {
  build,
  between,
  postpone,
} as const;

export { Period };
