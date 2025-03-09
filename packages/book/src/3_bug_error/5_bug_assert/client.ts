import { divide } from '3_bug_error/5_bug_assert/divide.js';

// Infinity = 1 / 0
const divided = divide(1, 0);
// Infinity = Infinity + 10
const plus = divided + 10;

console.log(divided, plus);
