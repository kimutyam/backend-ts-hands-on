import { pipe } from 'remeda';
import type { Period } from './period.js';
import { isWithin, postpone } from './period.js';

const period: Period = {
  start: new Date(2024, 0, 1, 0, 0, 0),
  end: new Date(2024, 1, 1, 0, 0, 0),
};

pipe(
  period, // 対象のデータ
  postpone(3, 1), // 操作1
  isWithin(new Date(2024, 0, 4, 1, 0, 0)), // 操作2
);
