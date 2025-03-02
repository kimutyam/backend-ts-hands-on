import { pipe } from 'remeda';
import type { Period } from './period.js';
import { isWithin, postpone } from './period.js';

const period: Period = {
  start: new Date(2024, 0, 1, 0, 0, 0),
  end: new Date(2024, 1, 1, 0, 0, 0),
};
pipe(
  period,
  postpone(3, 1),
  isWithin(new Date(2024, 0, 4, 1, 0, 0)),
);
