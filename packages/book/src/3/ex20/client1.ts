import * as R from 'remeda';

import type { Period } from './period.js';
import { postpone } from './period.js';

const period: Period = {
  start: new Date(2024, 0, 1, 0, 0, 0),
  end: new Date(2024, 1, 1, 0, 0, 0),
};

const postponed = R.pipe(period, postpone(3, 1));

console.log(postponed);
