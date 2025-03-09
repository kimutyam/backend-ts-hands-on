import type { Period } from 'ch2/ex10/period.js';
import {
  extend,
  isWithin,
  postpone,
} from 'ch2/ex10/period.js';

const period: Period = {
  start: new Date(2024, 0, 1, 0, 0, 0),
  end: new Date(2024, 1, 1, 0, 0, 0),
};

const delayed = postpone(period, 3, 1);
const extended = extend(delayed, 1, 0);
const isWithIn = isWithin(
  extended,
  new Date(2024, 0, 4, 1, 0, 0),
);

console.log(isWithIn);
