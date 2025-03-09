import assert from 'node:assert';
import type { Brand } from '6_domain_model/14_vo/brand.js';

type Age = number & Brand<'Age'>;

const equals = (a: Age, b: Age): boolean => a === b;

// 20歳以上かどうかを判定する
const satisfiesMin = (age: Age) => age >= 20;

// 65歳以下かどうかを判定する
const satisfiesMax = (age: Age) => age <= 65;

const assertAge = (age: Age): void => {
  assert(satisfiesMin(age), '年齢を20歳以上にしてください');
  assert(satisfiesMax(age), '年齢を65歳以下にしてください');
  assert(
    Number.isInteger(age),
    '年齢は整数で指定してください',
  );
};

const build = (value: number): Age => {
  const v = value as Age;
  assertAge(v);
  return v;
};

const judgeGeneration = (
  age: Age,
): 'JUNIOR' | 'MIDDLE' | 'SENIOR' => {
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
