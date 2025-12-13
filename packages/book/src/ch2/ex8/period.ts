import { addDays, addHours, isAfter, isBefore, isEqual } from 'date-fns';

interface Period {
  readonly start: Date;
  readonly end: Date;
}

const isSameOrAfter = (date: Date, dateToCompare: Date): boolean =>
  isAfter(date, dateToCompare) || isEqual(date, dateToCompare);

const isSameOrBefore = (date: Date, dateToCompare: Date): boolean =>
  isBefore(date, dateToCompare) || isEqual(date, dateToCompare);

const contains = (period: Period, dateToCompare: Date): boolean => {
  const { start, end } = period;
  return (
    isSameOrBefore(start, dateToCompare) && isSameOrAfter(end, dateToCompare)
  );
};

const postpone = (
  period: Period,
  delayDays: number,
  delayHours: number,
): Period => {
  const { start, end } = period;
  return {
    start: addHours(addDays(start, delayDays), delayHours),
    end: addHours(addDays(end, delayDays), delayHours),
  };
};

const extend = (
  period: Period,
  extensionDays: number,
  extensionHours: number,
): Period => {
  const { start, end } = period;
  return {
    start,
    end: addHours(addDays(end, extensionDays), extensionHours),
  };
};

export { extend, contains, postpone, type Period };

// type PeriodISOString {
//   readonly start: Date;
//   readonly end: Date;
// }

type PeriodTimeKeys = 'start' | 'end';

type PeriodISOString = {
  readonly [K in keyof Pick<Period, PeriodTimeKeys>]: string;
};

const toISOString = (period: Period): PeriodISOString => {
  const { start, end } = period;
  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
};

export { toISOString, type PeriodISOString };
