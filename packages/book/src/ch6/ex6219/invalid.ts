import type { Period } from 'ch6/ex6219/period.js';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const period: Period = {
  start: new Date(2024, 0, 1, 0, 0, 0),
  end: new Date(2024, 0, 31, 0, 0, 0),
};

console.log(period);
