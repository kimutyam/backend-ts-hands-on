import { addDays, addHours, isAfter, isBefore, isEqual } from 'date-fns';

const isSameOrBefore = (date: Date, dateToCompare: Date): boolean =>
  isBefore(date, dateToCompare) || isEqual(date, dateToCompare);

const isSameOrAfter = (date: Date, dateToCompare: Date): boolean =>
  isAfter(date, dateToCompare) || isEqual(date, dateToCompare);

class Period {
  // 1
  constructor(
    public readonly start: Date,
    public readonly end: Date,
  ) {}

  // 2
  isWithin(dateToCompare: Date): boolean {
    return (
      isSameOrBefore(this.start, dateToCompare) &&
      isSameOrAfter(this.end, dateToCompare)
    );
  }

  // 3
  postpone(delayDays: number, delayHours: number): Period {
    return new Period(
      addHours(addDays(this.start, delayDays), delayHours),
      addHours(addDays(this.end, delayDays), delayHours),
    );
  }

  // 4
  extend(extensionDays: number, extensionHours: number): Period {
    return new Period(
      this.start,
      addHours(addDays(this.end, extensionDays), extensionHours),
    );
  }

  // 5
  static build(start: Date, periodDate: number): Period {
    return new Period(start, addDays(start, periodDate));
  }
}

export { Period };
