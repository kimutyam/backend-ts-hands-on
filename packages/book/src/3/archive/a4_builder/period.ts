import { addDays, addHours, isAfter, isBefore, isEqual } from 'date-fns/fp';
import * as R from 'remeda';

interface Period {
  readonly start: Date;
  readonly end: Date;
  readonly contains: (dateToCompare: Date) => boolean;
  readonly postpone: (delayDays: number, delayHours: number) => Period;
  readonly extend: (extensionDays: number, extensionHours: number) => Period;
}

const isSameOrBefore =
  (dateToCompare: Date) =>
  (date: Date): boolean =>
    isBefore(date, dateToCompare) || isEqual(date, dateToCompare);

const isSameOrAfter =
  (dateToCompare: Date) =>
  (date: Date): boolean =>
    isAfter(date, dateToCompare) || isEqual(date, dateToCompare);

const Period = (start: Date, end: Date): Period => {
  const self = {
    start,
    end,
  };
  return {
    ...self,
    contains: (dateToCompare: Date): boolean =>
      R.pipe(self.start, isSameOrBefore(dateToCompare)) &&
      R.pipe(self.end, isSameOrAfter(dateToCompare)),
    postpone: (delayDays: number, delayHours: number): Period =>
      Period(
        R.pipe(self.start, addDays(delayDays), addHours(delayHours)),
        R.pipe(self.end, addDays(delayDays), addHours(delayHours)),
      ),
    extend: (extensionDays: number, extensionHours: number): Period =>
      Period(
        self.start,
        R.pipe(self.end, addDays(extensionDays), addHours(extensionHours)),
      ),
  };
};

export { Period };
