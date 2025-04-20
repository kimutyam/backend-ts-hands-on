interface Age {
  readonly value: number;
}

type Generation = 'JUNIOR' | 'MIDDLE' | 'SENIOR';

const equals = (a: Age, b: Age): boolean => a.value === b.value;

const valueOf = (value: number): Age => ({ value });

const judgeGeneration = ({ value }: Age): Generation => {
  if (value <= 29) {
    return 'JUNIOR';
  }
  if (value >= 55) {
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
