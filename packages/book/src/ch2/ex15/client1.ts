import * as R from 'remeda';

import type { Period } from './period.js';
import { contains } from './period.js';

const period: Period = {
  start: new Date(2024, 0, 1, 0, 0, 0),
  end: new Date(2024, 1, 1, 0, 0, 0),
};

const isContained = R.pipe(
  period, // 1
  contains(new Date(2024, 0, 4, 1, 0, 0)), // 2
);

console.log(isContained); // true
