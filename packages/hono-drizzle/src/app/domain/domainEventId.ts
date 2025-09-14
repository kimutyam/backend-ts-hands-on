import { decodeTime, ulid } from 'ulidx';
import * as z from 'zod';

const schema = z.string().ulid().brand('DomainEventId');
type Input = z.input<typeof schema>;
type DomainEventId = z.infer<typeof schema>;

const equals = (a: DomainEventId, b: DomainEventId): boolean => a === b;

const valueOf = (value: Input): DomainEventId => schema.parse(value);

const SEED = 123;
const generate = (): DomainEventId => valueOf(ulid(SEED));

const getTimestamp = (id: DomainEventId): number => decodeTime(id);

const DomainEventId = {
  schema,
  valueOf,
  generate,
  equals,
  getTimestamp,
} as const;

export { DomainEventId };
