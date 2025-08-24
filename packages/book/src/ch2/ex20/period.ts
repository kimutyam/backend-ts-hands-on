import { addDays, addHours } from 'date-fns';

interface Period {
  readonly start: Date;
  readonly end: Date;
}

const postpone =
  (delayDays: number, delayHours: number) =>
  (period: Period): Period => {
    const { start, end } = period;
    return {
      start: addHours(addDays(start, delayDays), delayHours),
      end: addHours(addDays(end, delayDays), delayHours),
    };
  };

export { postpone, type Period };
