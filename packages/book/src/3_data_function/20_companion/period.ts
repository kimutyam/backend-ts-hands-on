import { addDays } from 'date-fns/fp';

interface Period {
  readonly start: Date;
  readonly end: Date;
}

const build = (start: Date, periodDate: number): Period => ({
  start,
  end: addDays(periodDate)(start),
});

const Period = {
  build,
} as const;

export { Period };
