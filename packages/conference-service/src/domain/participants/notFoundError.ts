import type { ConferenceId } from '../conference';

export class RestrictionNotFoundError extends Error {
  constructor(public readonly conferenceId: ConferenceId) {
    super('参加制限が存在しません');
    this.name = 'RestrictionNotFoundError';
  }
}
