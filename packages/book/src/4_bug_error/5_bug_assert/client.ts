import { divide } from './divide';

// Infinity = 1 / 0
const divided = divide(1, 0);
// Infinity = Infinity + 10
const plus = divided + 10;

console.log(divided, plus);
