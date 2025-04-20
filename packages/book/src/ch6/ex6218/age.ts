import assert from 'node:assert';

import type { Brand } from 'ch6/ex6218/brand.js';

type Age = number & Brand<'Age'>;

const satisfiesMin = (age: Age) => age >= 20;

const satisfiesMax = (age: Age) => age <= 65;

const assertAge = (age: Age): void => {
  assert(satisfiesMin(age), '年齢を20歳以上にしてください');
  assert(satisfiesMax(age), '年齢を65歳以下にしてください');
  assert(Number.isInteger(age), '年齢は整数で指定してください');
};

const valueOf = (value: number): Age => {
  // 1
  const v = value as Age;
  // 2
  assertAge(v);
  return v;
};

const Age = {
  valueOf,
} as const;

export type { Age };
