import { build as buildPeriod } from './period';
import { build as buildSomething } from './something';

buildPeriod(new Date(2024, 0, 1, 0, 0, 0), 30);
buildSomething('foo');
