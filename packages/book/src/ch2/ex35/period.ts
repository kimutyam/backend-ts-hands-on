import { addDays, addHours, isAfter, isBefore, isEqual } from 'date-fns/fp';
import * as R from 'remeda';

interface Period {
  readonly start: Date;
  readonly end: Date;
}

const isSameOrBefore =
  (dateToCompare: Date) =>
  (date: Date): boolean =>
    R.pipe(date, isBefore(dateToCompare)) ||
    R.pipe(date, isEqual(dateToCompare));

const isSameOrAfter =
  (dateToCompare: Date) =>
  (date: Date): boolean =>
    R.pipe(date, isAfter(dateToCompare)) ||
    R.pipe(date, isEqual(dateToCompare));

const isWithin =
  (dateToCompare: Date) =>
  (period: Period): boolean => {
    const { start, end } = period;
    return (
      R.pipe(start, isSameOrBefore(dateToCompare)) &&
      R.pipe(end, isSameOrAfter(dateToCompare))
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

export { extend, isWithin, postpone, type Period };
