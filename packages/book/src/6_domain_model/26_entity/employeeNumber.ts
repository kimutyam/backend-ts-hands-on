import assert from 'node:assert';
import type { Brand } from '6_domain_model/26_entity/brand.js';

type EmployeeNumber = number & Brand<'EmployeeNumber'>;

const assertEmployeeNumber = (
  value: EmployeeNumber,
): void => {
  assert(value > 0, '社員番号は1以上にしてください');
  assert(
    Number.isInteger(value),
    '社員番号は整数で指定してください',
  );
};

const build = (value: number): EmployeeNumber => {
  const v = value as EmployeeNumber;
  assertEmployeeNumber(v);
  return v;
};

const equals = (
  a: EmployeeNumber,
  b: EmployeeNumber,
): boolean => a === b;

const EmployeeNumber = {
  build,
  equals,
} as const;

export { EmployeeNumber };
