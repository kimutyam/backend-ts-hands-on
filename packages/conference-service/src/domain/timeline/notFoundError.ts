import type { ConferenceId } from '../conference';

export class TimelineNotFoundError extends Error {
  constructor(public readonly conferenceId: ConferenceId) {
    super('タイムラインが存在しません');
    this.name = 'TimelineNotFoundError';
  }
}
