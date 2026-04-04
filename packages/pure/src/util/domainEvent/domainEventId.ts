import { createEncoder } from '#/util/nominal/codec/createEncoder.js';
import { createGenerator } from '#/util/nominal/createGenerator.js';
import type { Nominal } from '#/util/nominal/nominal.js';

type RawType = string;
const TypeValue = 'DomainEventId';
type Type = typeof TypeValue;
type DomainEventId = Nominal<Type, RawType>;

const DomainEventId = {
  ...createEncoder<Type, DomainEventId>(),
  ...createGenerator<Type>(TypeValue)(() => 'FIXME'),
} as const;

export { DomainEventId };
