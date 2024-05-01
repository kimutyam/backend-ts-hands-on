import { decodeTime, ulid } from 'ulidx';
import * as z from 'zod';
import type { Eq } from '../../10_zod/util/eq';

export declare const DomainEventIdBrand: unique symbol;

const schema = z.string().ulid().brand(DomainEventIdBrand);
const generate = () => schema.parse(ulid());

type Input = z.input<typeof schema>;
export type DomainEventId = z.infer<typeof schema>;

const equals: Eq<DomainEventId> = (x: DomainEventId, y: DomainEventId): boolean => x === y;

const build = (a: Input): DomainEventId => schema.parse(a);

const getTimestamp = (id: DomainEventId): number => decodeTime(id);

export const DomainEventId = {
  schema,
  build,
  generate,
  equals,
  getTimestamp,
} as const;
