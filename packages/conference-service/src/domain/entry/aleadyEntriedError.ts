import type { Entry } from './entry';

export class AlreadyEnteredError extends Error {
  constructor(public readonly entry: Entry) {
    super('既に応募しています');
    this.name = 'AlreadyEnteredError';
  }
}
