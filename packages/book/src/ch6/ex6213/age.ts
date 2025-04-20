type Age = number;

const equals = (a: Age, b: Age): boolean => a === b;

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
  equals,
  judgeGeneration,
} as const;

export { Age };
