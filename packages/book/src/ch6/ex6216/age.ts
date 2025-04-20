const AgeBrand = Symbol.for('Age');

type Age = number & {
  readonly [AgeBrand]: unknown;
};

export type { Age };
