import type { Period } from 'ch2/ex2111/period.js';
import { extend, isWithin, postpone } from 'ch2/ex2111/period.js';

const period: Period = {
  start: new Date(2024, 0, 1, 0, 0, 0),
  end: new Date(2024, 1, 1, 0, 0, 0),
};

isWithin(extend(postpone(period, 3, 1), 1, 0), new Date(2024, 0, 4, 1, 0, 0));
