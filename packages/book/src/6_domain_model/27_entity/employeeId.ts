import assert from 'node:assert';
import { ulid, isValid } from 'ulidx';

type EmployeeId = string;

const equals = (a: EmployeeId, b: EmployeeId): boolean => a === b;

const assertEmployeeNumber = (value: EmployeeId): void => {
  assert(isValid(value), 'ULIDで指定ください');
};

const build = (value: string): EmployeeId => {
  assertEmployeeNumber(value);
  return value;
};

const SEED = 123;
const generate = (): EmployeeId => ulid(SEED);

const EmployeeId = {
  build,
  equals,
  generate,
} as const;

export { EmployeeId };
