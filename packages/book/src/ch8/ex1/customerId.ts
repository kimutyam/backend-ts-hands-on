import assert from 'node:assert';
import type { Brand } from 'ch8/ex1/brand.js';
import { isValid, ulid } from 'ulidx';

type CustomerId = string & Brand<'CustomerId'>;

const equals = (a: CustomerId, b: CustomerId): boolean => a === b;

const assertCustomerId = (value: CustomerId): void => {
  assert(isValid(value), 'ULIDで指定ください');
};

const build = (value: string): CustomerId => {
  const v = value as CustomerId;
  assertCustomerId(v);
  return v;
};

// 乱数生成器のシード
const SEED = 123;
const generate = (): CustomerId => build(ulid(SEED));

const CustomerId = {
  build,
  equals,
  generate,
} as const;

export { CustomerId };
