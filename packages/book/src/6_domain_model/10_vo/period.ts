import assert from 'node:assert';
import type { Brand } from '6_domain_model/10_vo/brand.js';
import {
  addDays,
  addHours,
  isAfter,
  isBefore,
  isEqual,
} from 'date-fns/fp';
import { pipe } from 'remeda';

interface Period extends Brand<'Period'> {
  readonly start: Date;
  readonly end: Date;
}

const equals = (a: Period, b: Period): boolean =>
  isEqual(a.start, b.start) && isEqual(a.end, b.end);

const isSameOrAfter =
  (dateToCompare: Date) =>
  (date: Date): boolean =>
    isAfter(date, dateToCompare) ||
    isEqual(date, dateToCompare);

const isSameOrBefore =
  (dateToCompare: Date) =>
  (date: Date): boolean =>
    isBefore(date, dateToCompare) ||
    isEqual(date, dateToCompare);

// 期間の長さが3日以上かどうかを判定する
const satisfiesMin = ({ start, end }: Period) => {
  const addedStart = addDays(3)(start);
  return pipe(end, isSameOrAfter(addedStart));
};

// 期間の長さが10日以下かどうかを判定する
const satisfiesMax = ({ start, end }: Period) => {
  const addedStart = addDays(10)(start);
  return pipe(end, isSameOrBefore(addedStart));
};

// 不変条件を満たすかどうかを検証する
const assertPeriod = (period: Period): void => {
  assert(
    satisfiesMin(period),
    '期間を3日以上設けてください',
  );
  assert(
    satisfiesMax(period),
    '期間を10日未満にしてください',
  );
};

// 不変条件を満たす期間を生成する
const build = (start: Date, end: Date): Period => {
  const period = { start, end } as Period;
  assertPeriod(period);
  return period;
};

// build関数を経由
const buildAt = (start: Date, periodDate: number): Period =>
  build(start, pipe(start, addDays(periodDate)));

const isWithin =
  (dateToCompare: Date) =>
  ({ start, end }: Period): boolean =>
    pipe(start, isSameOrAfter(dateToCompare)) &&
    pipe(end, isSameOrBefore(dateToCompare));

// build関数を経由
const postpone =
  (delayDays: number, delayHours: number) =>
  ({ start, end }: Period): Period =>
    build(
      pipe(start, addDays(delayDays), addHours(delayHours)),
      pipe(end, addDays(delayDays), addHours(delayHours)),
    );

// build関数を経由
const extend =
  (extensionDays: number, extensionHours: number) =>
  ({ start, end }: Period): Period =>
    build(
      start,
      pipe(
        end,
        addDays(extensionDays),
        addHours(extensionHours),
      ),
    );

const Period = {
  build,
  buildAt,
  equals,
  isWithin,
  extend,
  postpone,
} as const;

export { Period };
