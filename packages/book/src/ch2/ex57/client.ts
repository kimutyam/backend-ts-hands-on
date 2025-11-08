import { build as buildPeriod } from './period.js';
import { build as buildSomething } from './something.js';

buildPeriod(new Date(2024, 0, 1, 0, 0, 0), 30);
buildSomething('foo');
