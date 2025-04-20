import { isEqual } from 'date-fns/fp';

interface Period {
  readonly start: Date;
  readonly end: Date;
}

const equals = (a: Period, b: Period): boolean =>
  isEqual(a.start, b.start) && isEqual(a.end, b.end);

const Period = {
  equals,
} as const;

export { Period };
