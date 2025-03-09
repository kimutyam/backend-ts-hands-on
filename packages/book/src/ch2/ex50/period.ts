import { addDays, addHours, isAfter, isBefore, isEqual } from 'date-fns/fp';
import { pipe } from 'remeda';

const isSameOrAfter =
  (dateToCompare: Date) =>
  (date: Date): boolean =>
    isAfter(date, dateToCompare) || isEqual(date, dateToCompare);

const isSameOrBefore =
  (dateToCompare: Date) =>
  (date: Date): boolean =>
    isBefore(date, dateToCompare) || isEqual(date, dateToCompare);

class Period {
  constructor(
    public readonly start: Date,
    public readonly end: Date,
  ) {}

  isWithin(dateToCompare: Date): boolean {
    return (
      pipe(this.start, isSameOrAfter(dateToCompare)) &&
      pipe(this.end, isSameOrBefore(dateToCompare))
    );
  }

  postpone(delayDays: number, delayHours: number): Period {
    return new Period(
      pipe(this.start, addDays(delayDays), addHours(delayHours)),
      pipe(this.end, addDays(delayDays), addHours(delayHours)),
    );
  }

  extend(extensionDays: number, extensionHours: number): Period {
    return new Period(
      this.start,
      pipe(this.end, addDays(extensionDays), addHours(extensionHours)),
    );
  }

  static build(start: Date, periodDate: number): Period {
    return new Period(start, pipe(start, addDays(periodDate)));
  }
}

export { Period };
