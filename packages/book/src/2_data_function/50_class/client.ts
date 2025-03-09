import { Period } from '2_data_function/50_class/period.js';

Period.build(new Date(2024, 0, 1, 0, 0, 0), 30)
  .postpone(3, 1)
  .extend(0, 10)
  .isWithin(new Date(2024, 0, 4, 1, 0, 0));
