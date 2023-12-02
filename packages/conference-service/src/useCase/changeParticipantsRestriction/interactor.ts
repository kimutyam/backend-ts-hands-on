import type { RestrictionChangedStore, RestrictionResolver } from '../../domain/participants';
import { RestrictionChangeService, RestrictionNotFoundError } from '../../domain/participants';
import { TimelineNotFoundError } from '../../domain/timeline';
import type { TimelineResolver } from '../../domain/timeline';
import { Failure } from '../../util/result';
import type { ChangeParticipantsRestriction, Input, Output } from './useCase';

export class Interactor implements ChangeParticipantsRestriction {
  constructor(
    private restrictionResolver: RestrictionResolver,
    private restrictionChangedStore: RestrictionChangedStore,
    private timelineResolver: TimelineResolver,
  ) {}

  async run({ conferenceId, maxLimit, now }: Input): Promise<Output> {
    const restriction = await this.restrictionResolver.resolveById(conferenceId);
    if (restriction === undefined) {
      return Failure(new RestrictionNotFoundError(conferenceId));
    }
    const timeline = await this.timelineResolver.resolveById(conferenceId);
    if (timeline === undefined) {
      return Failure(new TimelineNotFoundError(conferenceId));
    }
    const changeResult = RestrictionChangeService(timeline, restriction, maxLimit, now);
    if (changeResult.success) {
      await this.restrictionChangedStore.store(changeResult.data);
    }
    return changeResult;
  }
}
