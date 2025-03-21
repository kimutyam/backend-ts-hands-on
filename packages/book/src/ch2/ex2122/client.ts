import type { Period } from 'ch2/ex2122/period.js';
import { extend, isWithin, postpone } from 'ch2/ex2122/period.js';
import * as R from 'remeda';

const period: Period = {
  start: new Date(2024, 0, 1, 0, 0, 0),
  end: new Date(2024, 1, 1, 0, 0, 0),
};

R.pipe(
  period, // 1
  postpone(3, 1), // 2
  extend(1, 0), // 3
  isWithin(new Date(2024, 0, 4, 1, 0, 0)), // 4
);
