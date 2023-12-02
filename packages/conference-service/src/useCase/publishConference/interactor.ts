import { ConferenceNotFoundError, Conference } from '../../domain/conference';
import type { ConferenceResolver, PublishedStore } from '../../domain/conference';
import { Failure } from '../../util/result';
import type { PublishConferenceUseCase, Input, Output } from './useCase';

export class Interactor implements PublishConferenceUseCase {
  constructor(
    private conferenceResolver: ConferenceResolver,
    private publishedStore: PublishedStore,
  ) {}

  async run({ conferenceId }: Input): Promise<Output> {
    const conference = await this.conferenceResolver.resolveById(conferenceId);
    if (conference === undefined) {
      return Failure(ConferenceNotFoundError(conferenceId));
    }
    const publishResult = Conference.publish(conference);
    if (publishResult.success) {
      await this.publishedStore.store(publishResult.data);
    }
    return publishResult;
  }
}
