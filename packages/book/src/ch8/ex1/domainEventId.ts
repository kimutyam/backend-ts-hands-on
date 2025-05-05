import assert from 'node:assert';

import type { Brand } from 'ch8/ex1/brand.js';
import { decodeTime, isValid, ulid } from 'ulidx';

type DomainEventId = string & Brand<'DomainEventId'>;

const equals = (a: DomainEventId, b: DomainEventId): boolean => a === b;

const assertDomainEventId = (value: DomainEventId): void => {
  assert(isValid(value), 'ULIDで指定ください');
};

const valueOf = (value: string): DomainEventId => {
  const v = value as DomainEventId;
  assertDomainEventId(v);
  return v;
};

const SEED = 123;
const generate = (): DomainEventId => valueOf(ulid(SEED));

// 1
const getTimestamp = (id: DomainEventId): number => decodeTime(id);

const DomainEventId = {
  valueOf,
  generate,
  equals,
  getTimestamp,
} as const;

export { DomainEventId };
