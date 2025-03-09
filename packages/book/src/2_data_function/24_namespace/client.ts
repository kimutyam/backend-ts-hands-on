import { buildAt as buildPeriod } from '2_data_function/24_namespace/period.js';
import { buildAt as buildSomething } from '2_data_function/24_namespace/something.js';

buildPeriod(new Date(2024, 0, 1, 0, 0, 0), 30);
buildSomething('foo');
