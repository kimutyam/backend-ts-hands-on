import type { TimelineStatus } from '../timeline';

export class RestrictionChangeError extends Error {
  constructor(public readonly status: TimelineStatus) {
    super('応募期間を過ぎると参加上限数を変更できません');
    this.name = 'RestrictionChangeError';
  }
}
