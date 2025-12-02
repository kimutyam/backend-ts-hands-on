import { addDays, addHours, isAfter, isBefore, isEqual } from 'date-fns';

const isSameOrBefore = (date: Date, dateToCompare: Date): boolean =>
  isBefore(date, dateToCompare) || isEqual(date, dateToCompare);

const isSameOrAfter = (date: Date, dateToCompare: Date): boolean =>
  isAfter(date, dateToCompare) || isEqual(date, dateToCompare);

class Period {
  // 1
  constructor(
    private start: Date,
    private end: Date,
  ) {}

  contains(dateToCompare: Date): boolean {
    return (
      isSameOrBefore(this.start, dateToCompare) &&
      isSameOrAfter(this.end, dateToCompare)
    );
  }

  // 2
  postpone(delayDays: number, delayHours: number): void {
    this.start = addHours(addDays(this.start, delayDays), delayHours);
    this.end = addHours(addDays(this.end, delayDays), delayHours);
  }

  // 2
  extend(extensionDays: number, extensionHours: number): void {
    this.end = addHours(addDays(this.end, extensionDays), extensionHours);
  }

  // 3
  get startDate(): Date {
    return this.start;
  }

  // 3
  get endDate(): Date {
    return this.end;
  }

  static build(start: Date, periodDate: number): Period {
    return new Period(start, addDays(start, periodDate));
  }
}

export { Period };
