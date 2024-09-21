import { isBefore, isAfter, isEqual, addDays, addHours } from 'date-fns';

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
    isSameOrAfter(dateToCompare)(start) && isSameOrBefore(dateToCompare)(end);

const postpone =
  (delayDays: number, delayHours: number) =>
  (period: Period): Period => ({
    start: addHours(addDays(period.start, delayDays), delayHours),
    end: addHours(addDays(period.end, delayDays), delayHours),
  });

export { isWithin, postpone, type Period };
