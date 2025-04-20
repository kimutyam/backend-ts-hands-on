import assert from 'node:assert';

import type { Brand } from 'ch6/ex6219/brand.js';
import { addDays, addHours, isAfter, isBefore, isEqual } from 'date-fns/fp';
import * as R from 'remeda';

interface Period extends Brand<'Period'> {
  readonly start: Date;
  readonly end: Date;
}

const equals = (a: Period, b: Period): boolean =>
  isEqual(a.start, b.start) && isEqual(a.end, b.end);

const isSameOrAfter =
  (dateToCompare: Date) =>
  (date: Date): boolean =>
    isAfter(date, dateToCompare) || isEqual(date, dateToCompare);

const isSameOrBefore =
  (dateToCompare: Date) =>
  (date: Date): boolean =>
    isBefore(date, dateToCompare) || isEqual(date, dateToCompare);

// 1
const satisfiesMin = ({ start, end }: Period) => {
  const addedStart = R.pipe(start, addDays(3));
  return R.pipe(end, isSameOrAfter(addedStart));
};

// 2
const satisfiesMax = ({ start, end }: Period) => {
  const addedStart = R.pipe(start, addDays(10));
  return R.pipe(end, isSameOrBefore(addedStart));
};

// 3
const assertPeriod = (period: Period): void => {
  assert(satisfiesMin(period), '期間を3日以上設けてください');
  assert(satisfiesMax(period), '期間を10日未満にしてください');
};

// 4
const valueOf = (start: Date, end: Date): Period => {
  const period = { start, end } as Period;
  assertPeriod(period);
  return period;
};

// 5
const buildAt = (start: Date, periodDate: number): Period =>
  valueOf(start, R.pipe(start, addDays(periodDate)));

const isWithin =
  (dateToCompare: Date) =>
  ({ start, end }: Period): boolean =>
    R.pipe(start, isSameOrAfter(dateToCompare)) &&
    R.pipe(end, isSameOrBefore(dateToCompare));

const postpone =
  (delayDays: number, delayHours: number) =>
  ({ start, end }: Period): Period =>
    valueOf(
      R.pipe(start, addDays(delayDays), addHours(delayHours)),
      R.pipe(end, addDays(delayDays), addHours(delayHours)),
    );

const extend =
  (extensionDays: number, extensionHours: number) =>
  ({ start, end }: Period): Period =>
    valueOf(
      start,
      R.pipe(end, addDays(extensionDays), addHours(extensionHours)),
    );

const Period = {
  valueOf,
  buildAt,
  equals,
  isWithin,
  extend,
  postpone,
} as const;

export { Period };
