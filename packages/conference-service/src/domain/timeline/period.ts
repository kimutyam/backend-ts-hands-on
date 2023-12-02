import { isBefore, isAfter, isEqual } from 'date-fns';

export type Period = Readonly<{
  startDateTime: Date;
  endDateTime: Date;
}>;

export const Period = {
  isBefore:
    ({ startDateTime }: Period) =>
    (now: Date): boolean =>
      isBefore(startDateTime, now),
  inPeriod:
    ({ startDateTime, endDateTime }: Period) =>
    (now: Date): boolean =>
      (isEqual(startDateTime, now) || isAfter(startDateTime, now)) &&
      (isBefore(endDateTime, now) || isEqual(endDateTime, now)),
};
