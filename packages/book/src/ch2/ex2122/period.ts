import { addDays, addHours, isAfter, isBefore, isEqual } from 'date-fns';
import * as R from 'remeda';

interface Period {
  readonly start: Date;
  readonly end: Date;
}

// 1
const isSameOrAfter =
  (dateToCompare: Date) =>
  (date: Date): boolean =>
    isAfter(date, dateToCompare) || isEqual(date, dateToCompare);

// 1
const isSameOrBefore =
  (dateToCompare: Date) =>
  (date: Date): boolean =>
    isBefore(date, dateToCompare) || isEqual(date, dateToCompare);

const isWithin =
  (dateToCompare: Date) =>
  ({ start, end }: Period): boolean =>
    R.pipe(start, isSameOrAfter(dateToCompare)) &&
    R.pipe(end, isSameOrBefore(dateToCompare)); // 1

const postpone =
  (delayDays: number, delayHours: number) =>
  (period: Period): Period => ({
    start: addHours(addDays(period.start, delayDays), delayHours), // 2
    end: addHours(addDays(period.end, delayDays), delayHours), // 2
  });

const extend =
  (extensionDays: number, extensionHours: number) =>
  ({ start, end }: Period): Period => ({
    start,
    end: addHours(addDays(end, extensionDays), extensionHours), // 2
  });

export { extend, isWithin, postpone, type Period };
