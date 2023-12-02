import { Conference, ConferenceId } from '../../domain/conference';
import type { DraftedStore } from '../../domain/conference';
import { Restriction } from '../../domain/participants';
import type { RestrictionCreatedStore, RestrictionCreated } from '../../domain/participants';
import { Timeline } from '../../domain/timeline';
import type { TimelineCreatedStore, TimelineCreated } from '../../domain/timeline';
import type { Result } from '../../util/result';
import { Failure, Success } from '../../util/result';
import type { TransactionContext } from '../transactionContext';
import type {
  DraftConferenceUseCase,
  Input,
  Output,
  RestrictionDto,
  TimelineDto,
  UseCaseError,
} from './useCase';

const createRestriction = (
  conferenceId: ConferenceId,
  participants?: RestrictionDto,
): RestrictionCreated | undefined =>
  participants
    ? Restriction.create({
        aggregateId: conferenceId,
        maxLimit: participants.maxLimit,
      })
    : undefined;

const createTimeline = (
  conferenceId: ConferenceId,
  timelineDto?: TimelineDto,
): Result<UseCaseError, TimelineCreated> | undefined => {
  if (timelineDto) {
    const transformedTimeline = Timeline.transform({ aggregateId: conferenceId, ...timelineDto });
    if (transformedTimeline.success) {
      return Success(Timeline.create(transformedTimeline.data));
    }
    return transformedTimeline;
  }
  return undefined;
};

export class Interactor implements DraftConferenceUseCase {
  constructor(
    private draftedStore: DraftedStore,
    private restrictionCreatedStore: RestrictionCreatedStore,
    private timelineCreatedStore: TimelineCreatedStore,
    private transactionContext: TransactionContext,
  ) {}

  async run({ participantsDto, timelineDto }: Input): Promise<Output> {
    const conferenceId = ConferenceId.generate();
    const drafted = Conference.draft(conferenceId);
    const restrictionCreated = createRestriction(conferenceId, participantsDto);
    const timelineCreateResult = createTimeline(conferenceId, timelineDto);
    if (timelineCreateResult?.success === false) {
      return Failure(timelineCreateResult.error);
    }
    await this.transactionContext.runTransaction(async () => {
      await this.draftedStore.store(drafted);
      if (restrictionCreated !== undefined) {
        await this.restrictionCreatedStore.store(restrictionCreated);
      }
      if (timelineCreateResult !== undefined) {
        await this.timelineCreatedStore.store(timelineCreateResult.data);
      }
    });
    return Success({
      drafted,
      restrictionCreated,
      timelineCreated: timelineCreateResult?.data,
    });
  }
}
