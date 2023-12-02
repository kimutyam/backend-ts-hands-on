import { CallOffService, ConferenceNotFoundError } from '../../domain/conference';
import type { ConferenceResolver, CalledOffStore } from '../../domain/conference';
import { TimelineNotFoundError } from '../../domain/timeline';
import type { TimelineResolver } from '../../domain/timeline';
import { Failure } from '../../util/result';
import type { CallOffConference, Input, Output } from './useCase';

export class Interactor implements CallOffConference {
  constructor(
    private conferenceResolver: ConferenceResolver,
    private timelineResolver: TimelineResolver,
    private calledOffStore: CalledOffStore,
  ) {}

  async run({ conferenceId, reason, now }: Input): Promise<Output> {
    const conference = await this.conferenceResolver.resolveById(conferenceId);
    if (conference === undefined) {
      return Failure(ConferenceNotFoundError(conferenceId));
    }
    const timeline = await this.timelineResolver.resolveById(conferenceId);
    if (timeline === undefined) {
      return Failure(TimelineNotFoundError(conferenceId));
    }
    const result = CallOffService(conference, timeline, reason, now);
    if (result.success) {
      await this.calledOffStore.store(result.data);
    }
    return result;
  }
}
