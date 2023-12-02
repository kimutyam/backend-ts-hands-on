import type { TimelineStatus } from '../timeline';

export class CallOffError extends Error {
  constructor(public readonly status: TimelineStatus) {
    super('開催確定すると中止できません');
  }
}
