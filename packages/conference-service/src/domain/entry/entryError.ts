import type { TimelineStatus } from '../timeline';

export class EntryError extends Error {
  constructor(public readonly status: TimelineStatus) {
    super('応募期間中ではありません');
    this.name = 'EntryError';
  }
}
