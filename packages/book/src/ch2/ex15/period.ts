import { isAfter, isBefore, isEqual } from 'date-fns';

interface Period {
  readonly start: Date;
  readonly end: Date;
}

const isSameOrBefore = (date: Date, dateToCompare: Date): boolean =>
  isBefore(date, dateToCompare) || isEqual(date, dateToCompare);

const isSameOrAfter = (date: Date, dateToCompare: Date): boolean =>
  isAfter(date, dateToCompare) || isEqual(date, dateToCompare);

const isWithin =
  (dateToCompare: Date) =>
  (period: Period): boolean => {
    const { start, end } = period;
    return (
      isSameOrBefore(start, dateToCompare) && isSameOrAfter(end, dateToCompare)
    );
  };

export { isWithin, type Period };
