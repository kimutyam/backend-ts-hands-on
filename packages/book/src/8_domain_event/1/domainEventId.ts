import assert from 'node:assert';
import { decodeTime, isValid, ulid } from 'ulidx';
import type { Brand } from './brand.js';

type DomainEventId = string & Brand<'DomainEventId'>;

const equals = (
  a: DomainEventId,
  b: DomainEventId,
): boolean => a === b;

const assertDomainEventId = (
  value: DomainEventId,
): void => {
  assert(isValid(value), 'ULIDで指定ください');
};

const build = (value: string): DomainEventId => {
  const v = value as DomainEventId;
  assertDomainEventId(v);
  return v;
};

// 乱数生成器のシード
const SEED = 123;
const generate = (): DomainEventId => build(ulid(SEED));

const getTimestamp = (id: DomainEventId): number =>
  decodeTime(id);

const DomainEventId = {
  build,
  generate,
  equals,
  getTimestamp,
} as const;

export { DomainEventId };
