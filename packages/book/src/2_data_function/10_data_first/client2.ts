import type { Period } from '2_data_function/10_data_first/period.js';
import {
  extend,
  isWithin,
  postpone,
} from '2_data_function/10_data_first/period.js';

const period: Period = {
  start: new Date(2024, 0, 1, 0, 0, 0),
  end: new Date(2024, 1, 1, 0, 0, 0),
};

isWithin(
  extend(postpone(period, 3, 1), 1, 0),
  new Date(2024, 0, 4, 1, 0, 0),
);
