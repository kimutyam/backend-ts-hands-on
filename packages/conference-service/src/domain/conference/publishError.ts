import type { Conference } from './conference';

export class PublishError extends Error {
  constructor(public readonly conference: Conference) {
    super('既に公開しています');
  }
}
