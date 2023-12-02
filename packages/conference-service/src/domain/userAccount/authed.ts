import { DomainEvent } from '../../util/domainEvent';
import { Timeline } from '../timeline';
import type { UserAccountId } from './userAccountId';

const name = 'Authed';
export type Authed = DomainEvent<typeof name, UserAccountId>;

export const Authed = {
  build: DomainEvent.buildFn(name, Timeline.aggregateType),
} as const;
