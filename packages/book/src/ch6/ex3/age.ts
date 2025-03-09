interface Age {
  readonly value: number;
}

const equals = (a: Age, b: Age): boolean =>
  a.value === b.value;

const build = (value: number): Age => ({ value });

const judgeGeneration = ({
  value,
}: Age): 'JUNIOR' | 'MIDDLE' | 'SENIOR' => {
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
