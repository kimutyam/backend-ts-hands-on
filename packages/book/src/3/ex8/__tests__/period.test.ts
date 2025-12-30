import { contains } from '../period.js';

it('a', () => {
  const period = {
    start: new Date(2024, 0, 1, 0, 0, 0),
    end: new Date(2025, 1, 1, 0, 0, 0),
  };
  const a = contains(period, new Date(2024, 1, 4, 1, 0, 0)); // 1月4日1時は期間内
  expect(a).toBe(true);
});
