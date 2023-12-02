import { AlreadyEnteredError, EntryService } from '../../domain/entry';
import type { EntryAppliedStore, EntryResolver } from '../../domain/entry/repository';
import { TimelineNotFoundError } from '../../domain/timeline';
import type { TimelineResolver } from '../../domain/timeline';
import { Failure } from '../../util/result';
import type { EntryUseCase, Input, Output } from './useCase';

export class Interactor implements EntryUseCase {
  constructor(
    private entryAppliedStore: EntryAppliedStore,
    private entryResolver: EntryResolver,
    private timelineResolver: TimelineResolver,
  ) {}

  async run({ userAccountId, conferenceId, now }: Input): Promise<Output> {
    const entry = await this.entryResolver.resolveById({ userAccountId, conferenceId });
    if (entry !== undefined) {
      return Failure(new AlreadyEnteredError(entry));
    }
    const timeline = await this.timelineResolver.resolveById(conferenceId);
    if (timeline === undefined) {
      return Failure(new TimelineNotFoundError(conferenceId));
    }
    const applyResult = EntryService(timeline, userAccountId, conferenceId, now);
    if (applyResult.success) {
      await this.entryAppliedStore.store(applyResult.data);
    }
    return applyResult;
  }
}
