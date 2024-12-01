import assert from 'node:assert';

interface Age {
  readonly value: number;
}

const equals = (a: Age, b: Age): boolean => a.value === b.value;

// 20歳以上かどうかを判定する
const satisfiesMin = ({ value }: Age) => value >= 20;

// 65歳以下かどうかを判定する
const satisfiesMax = ({ value }: Age) => value <= 65;

const assertAge = (age: Age): void => {
  assert(satisfiesMin(age), '年齢を20歳以上にしてください');
  assert(satisfiesMax(age), '年齢を65歳以下にしてください');
};

const build = (value: number): Age => {
  const age = { value };
  assertAge(age);
  return age;
};

const judgeGeneration = ({ value }: Age): 'JUNIOR' | 'MIDDLE' | 'SENIOR' => {
  if (value <= 29) {
    return 'JUNIOR';
  }
  if (value >= 55) {
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
