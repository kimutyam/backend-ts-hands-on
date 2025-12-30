import assert from 'node:assert';

type Age = number;

const equals = (a: Age, b: Age): boolean => a === b;

const satisfiesMin = (age: Age) => age >= 20;

const satisfiesMax = (age: Age) => age <= 65;

// 1
const assertAge = (age: Age): void => {
  assert(satisfiesMin(age), '年齢を20歳以上にしてください');
  assert(satisfiesMax(age), '年齢を65歳以下にしてください');
  assert(Number.isInteger(age), '年齢は整数で指定してください');
};

// 2
const valueOf = (value: number): Age => {
  assertAge(value);
  return value;
};

const judgeGeneration = (age: Age): 'JUNIOR' | 'MIDDLE' | 'SENIOR' => {
  if (age <= 29) {
    return 'JUNIOR';
  }
  if (age >= 55) {
    return 'SENIOR';
  }
  return 'MIDDLE';
};

const Age = {
  valueOf,
  equals,
  judgeGeneration,
} as const;

export { Age };
