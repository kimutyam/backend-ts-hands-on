import { createEncoder } from '../nominal/codec/createEncoder';
import { createGenerator } from '../nominal/createGenerator';
import type { Nominal } from '../nominal/nominal';

type RawType = string;
const TypeValue = 'DomainEventId';
type Type = typeof TypeValue;
type DomainEventId = Nominal<Type, RawType>;

const DomainEventId = {
  ...createEncoder<Type, DomainEventId>(),
  ...createGenerator<Type>(TypeValue)(() => 'FIXME'),
} as const;

export { DomainEventId };
