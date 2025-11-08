import * as R from 'remeda';

import { Period } from './period.js';

R.pipe(
  Period.build(new Date(2024, 0, 1, 0, 0, 0), 30),
  Period.postpone(3, 1),
  Period.extend(0, 10),
  Period.isWithin(new Date(2024, 0, 4, 1, 0, 0)),
);
