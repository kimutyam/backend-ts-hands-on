import { addDays, addHours, isAfter, isBefore, isEqual } from 'date-fns';

interface Period {
  readonly start: Date;
  readonly end: Date;
}

const isSameOrAfter = (date: Date, dateToCompare: Date): boolean =>
  isAfter(date, dateToCompare) || isEqual(date, dateToCompare);

const isSameOrBefore = (date: Date, dateToCompare: Date): boolean =>
  isBefore(date, dateToCompare) || isEqual(date, dateToCompare);

// 1
const isWithin = ({ start, end }: Period, dateToCompare: Date): boolean =>
  isSameOrAfter(start, dateToCompare) && isSameOrBefore(end, dateToCompare);

// 2
const postpone = (
  { start, end }: Period,
  delayDays: number,
  delayHours: number,
): Period => ({
  start: addHours(addDays(start, delayDays), delayHours),
  end: addHours(addDays(end, delayDays), delayHours),
});

// 3
const extend = (
  { start, end }: Period,
  extensionDays: number,
  extensionHours: number,
): Period => ({
  start,
  end: addHours(addDays(end, extensionDays), extensionHours),
});

export { extend, isWithin, postpone, type Period };
