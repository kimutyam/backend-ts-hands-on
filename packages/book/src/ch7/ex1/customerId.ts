import assert from 'node:assert';

import { isValid, ulid } from 'ulidx';

import type { Brand } from './brand.js';

type CustomerId = string & Brand<'CustomerId'>;

const equals = (a: CustomerId, b: CustomerId): boolean => a === b;

const assertCustomerId = (value: CustomerId): void => {
  assert(isValid(value), 'ULIDで指定ください');
};

const valueOf = (value: string): CustomerId => {
  const v = value as CustomerId;
  assertCustomerId(v);
  return v;
};

const generate = (): CustomerId => valueOf(ulid());

const CustomerId = {
  valueOf,
  equals,
  generate,
} as const;

export { CustomerId };
