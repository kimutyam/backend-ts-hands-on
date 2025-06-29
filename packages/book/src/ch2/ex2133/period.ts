import { addDays, addHours, isAfter, isBefore, isEqual } from 'date-fns/fp';
import * as R from 'remeda';

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

const isWithin =
  (dateToCompare: Date) =>
  (period: Period): boolean => {
    const { start, end } = period;
    return (
      R.pipe(start, isSameOrAfter(dateToCompare)) &&
      R.pipe(end, isSameOrBefore(dateToCompare))
    );
  };

const postpone =
  (delayDays: number, delayHours: number) =>
  (period: Period): Period => {
    const { start, end } = period;
    return {
      start: R.pipe(start, addDays(delayDays), addHours(delayHours)),
      end: R.pipe(end, addDays(delayDays), addHours(delayHours)),
    };
  };

const extend =
  (extensionDays: number, extensionHours: number) =>
  (period: Period): Period => {
    const { start, end } = period;
    return {
      start,
      end: R.pipe(end, addDays(extensionDays), addHours(extensionHours)),
    };
  };

const build = (start: Date, periodDate: number): Period => ({
  start,
  end: R.pipe(start, addDays(periodDate)),
});

const Period = {
  build,
  isWithin,
  extend,
  postpone,
} as const;

export { Period };
