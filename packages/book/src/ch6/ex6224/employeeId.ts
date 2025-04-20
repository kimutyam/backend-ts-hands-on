import assert from 'node:assert';

import type { Brand } from 'ch6/ex6224/brand.js';
import { isValid, ulid } from 'ulidx';

type EmployeeId = string & Brand<'EmployeeId'>;

const equals = (a: EmployeeId, b: EmployeeId): boolean => a === b;

const assertEmployeeNumber = (value: EmployeeId): void => {
  // 1
  assert(isValid(value), 'ULIDで指定ください');
};

const valueOf = (value: string): EmployeeId => {
  const v = value as EmployeeId;
  assertEmployeeNumber(v);
  return v;
};

// 2
const SEED = 123;
// 3
const generate = (): EmployeeId => valueOf(ulid(SEED));

const EmployeeId = {
  valueOf,
  equals,
  generate,
} as const;

export { EmployeeId };
