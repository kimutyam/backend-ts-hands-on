import type { ConferenceId } from './conferenceId';

export class ConferenceNotFoundError extends Error {
  constructor(public readonly conferenceId: ConferenceId) {
    super('カンファレンスが存在しません');
  }
}
