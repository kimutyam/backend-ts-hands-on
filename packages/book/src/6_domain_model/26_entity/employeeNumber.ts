import assert from 'node:assert';

type EmployeeNumber = number;

const assertEmployeeNumber = (value: EmployeeNumber): void => {
  assert(value > 0, '社員番号は1以上にしてください');
  assert(Number.isInteger(value), '社員番号は整数で指定してください');
};

const build = (value: number): EmployeeNumber => {
  assertEmployeeNumber(value);
  return value;
};

const equals = (a: EmployeeNumber, b: EmployeeNumber): boolean => a === b;

const EmployeeNumber = {
  build,
  equals,
} as const;

export { EmployeeNumber };
