import { addDays, addHours, isAfter, isBefore, isEqual } from 'date-fns';
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
    pipe(start, isSameOrAfter(dateToCompare)) &&
    pipe(end, isSameOrBefore(dateToCompare));

const postpone =
  (delayDays: number, delayHours: number) =>
  (period: Period): Period => ({
    start: addHours(addDays(period.start, delayDays), delayHours),
    end: addHours(addDays(period.end, delayDays), delayHours),
  });

const extend =
  (extensionDays: number, extensionHours: number) =>
  ({ start, end }: Period): Period => ({
    start,
    end: addHours(addDays(end, extensionDays), extensionHours),
  });

export { extend, isWithin, type Period, postpone };
