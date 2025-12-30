import * as R from 'remeda';

const sum = (arr: Array<number>): number => arr.reduce((a, b) => a + b, 0);

const toString = (x: number): string => x.toString();

const result = R.pipe(
  [1, 2, 3, 4], // 1
  sum, // 2
  toString, // 3
);

console.log(result); // '10'
