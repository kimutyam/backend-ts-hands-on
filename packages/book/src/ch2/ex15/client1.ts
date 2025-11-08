import * as R from 'remeda';

import type { Period } from './period.js';
import { isWithin } from './period.js';

const period: Period = {
  start: new Date(2024, 0, 1, 0, 0, 0),
  end: new Date(2024, 1, 1, 0, 0, 0),
};

const isWithinResult = R.pipe(
  period, // 1
  isWithin(new Date(2024, 0, 4, 1, 0, 0)), // 2
);

console.log(isWithinResult); // true
