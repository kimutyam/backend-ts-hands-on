import { Period } from 'ch2/archive/a4_builder/period.js';

const period = Period(
  new Date(2024, 0, 1, 0, 0, 0),
  new Date(2025, 0, 1, 0, 0, 0),
);

const isPeriod = (p: Period): boolean => p instanceof Period;

if (isPeriod(period)) {
  console.log('Period instance created successfully');
}

Period(new Date(2024, 0, 1, 0, 0, 0), new Date(2025, 0, 1, 0, 0, 0))
  .postpone(3, 1)
  .extend(0, 10)
  .isWithin(new Date(2024, 0, 4, 1, 0, 0));
