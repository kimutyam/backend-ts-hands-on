import assert from 'node:assert';

import type { Brand } from 'ch6/ex27/brand.js';
import { isValid, ulid } from 'ulidx';

type EmployeeId = string & Brand<'EmployeeId'>;

const equals = (a: EmployeeId, b: EmployeeId): boolean => a === b;

const assertEmployeeNumber = (value: EmployeeId): void => {
  assert(isValid(value), 'ULIDで指定ください');
};

const build = (value: string): EmployeeId => {
  const v = value as EmployeeId;
  assertEmployeeNumber(v);
  return v;
};

// 乱数生成器のシード
const SEED = 123;
const generate = (): EmployeeId => build(ulid(SEED));

const EmployeeId = {
  build,
  equals,
  generate,
} as const;

export { EmployeeId };
