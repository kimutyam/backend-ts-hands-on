import { divide } from './divide';

const divided = divide(1, 0);

console.log(
  divided, // Infinity = 1 / 0
  divided + 10, // Infinity = Infinity + 10
);
