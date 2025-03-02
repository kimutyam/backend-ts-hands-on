import {
  isBefore,
  isAfter,
  isEqual,
  addDays,
  addHours,
} from 'date-fns';

interface Period {
  readonly start: Date;
  readonly end: Date;
}

const isSameOrAfter = (
  date: Date,
  dateToCompare: Date,
): boolean =>
  isAfter(date, dateToCompare) ||
  isEqual(date, dateToCompare);

const isSameOrBefore = (
  date: Date,
  dateToCompare: Date,
): boolean =>
  isBefore(date, dateToCompare) ||
  isEqual(date, dateToCompare);

const isWithin = (
  { start, end }: Period,
  dateToCompare: Date,
): boolean =>
  isSameOrAfter(start, dateToCompare) &&
  isSameOrBefore(end, dateToCompare);

const postpone = (
  { start, end }: Period,
  delayDays: number,
  delayHours: number,
): Period => ({
  start: addHours(addDays(start, delayDays), delayHours),
  end: addHours(addDays(end, delayDays), delayHours),
});

const extend = (
  { start, end }: Period,
  extensionDays: number,
  extensionHours: number,
): Period => ({
  start,
  end: addHours(
    addDays(end, extensionDays),
    extensionHours,
  ),
});

export { type Period, isWithin, postpone, extend };
