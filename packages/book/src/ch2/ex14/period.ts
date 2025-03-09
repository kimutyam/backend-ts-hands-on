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

const isWithin =
  (dateToCompare: Date) =>
  ({ start, end }: Period): boolean =>
    pipe(start, isSameOrAfter(dateToCompare)) && pipe(end, isSameOrBefore(dateToCompare));

const postpone =
  (delayDays: number, delayHours: number) =>
  ({ start, end }: Period): Period => ({
    start: pipe(start, addDays(delayDays), addHours(delayHours)),
    end: pipe(end, addDays(delayDays), addHours(delayHours)),
  });

const extend =
  (extensionDays: number, extensionHours: number) =>
  ({ start, end }: Period): Period => ({
    start,
    end: pipe(end, addDays(extensionDays), addHours(extensionHours)),
  });

export { isWithin, postpone, extend, type Period };
