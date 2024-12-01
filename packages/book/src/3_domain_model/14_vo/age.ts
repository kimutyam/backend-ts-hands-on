import assert from 'node:assert';

type Age = number;

const equals = (a: Age, b: Age): boolean => a === b;

// 20歳以上かどうかを判定する
const satisfiesMin = (age: Age) => age >= 20;

// 65歳以下かどうかを判定する
const satisfiesMax = (age: Age) => age <= 65;

const assertAge = (age: Age): void => {
  assert(satisfiesMin(age), '年齢を20歳以上にしてください');
  assert(satisfiesMax(age), '年齢を65歳以下にしてください');
};

const build = (value: number): Age => {
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
  build,
  equals,
  judgeGeneration,
} as const;

export { Age };
