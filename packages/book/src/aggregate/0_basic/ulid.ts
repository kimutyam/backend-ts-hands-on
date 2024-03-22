import assert from 'assert';
import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';
import { isValid, ulid } from 'ulidx';
import type { ProductId } from './product/productId';
import { UlidError } from './ulidError';

const generate = (): ProductId => ulid();

const build = (value: string): string => {
  assert(isValid(value), 'ULIDにしてください');
  return value;
};

const safeBuild = (value: string): Result<string, UlidError> =>
  isValid(value) ? ok(value) : err(new UlidError('ULIDにしてください'));

const equals = <T>(x: T, y: T): boolean => x === y;

export const Ulid = {
  build,
  safeBuild,
  generate,
  equals,
} as const;
