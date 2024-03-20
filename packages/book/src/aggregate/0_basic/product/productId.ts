import assert from 'assert';
import { isValid, ulid } from 'ulidx';
import type { Eq } from '../eq';

export type ProductId = string;

const generate = (): ProductId => ulid();

const validate = (value: string): Array<string> => {
  const issues: Array<string> = [];
  if (!isValid(value)) {
    issues.push('ULIDで指定してください');
  }
  return issues;
};

const build = (value: string): ProductId => {
  let issues: Array<string>;
  assert((issues = validate(value)).length === 0, issues.join('\n'));
  return value;
};

const equals: Eq<ProductId> = (x: ProductId, y: ProductId): boolean => x === y;

export const ProductId = {
  build,
  equals,
  generate,
} as const;
