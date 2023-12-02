import type { ConferenceId } from '../../domain/conference';
import type { RestrictionNotFoundError, RestrictionChangeError } from '../../domain/participants';
import type { MaxNumberOfParticipants } from '../../domain/participants/maxNumberOfParticipants';
import type { RestrictionChanged } from '../../domain/participants/restrictionChanged';
import type { TimelineNotFoundError } from '../../domain/timeline';
import type { Result } from '../../util/result';
import type { UseCase } from '../useCase';

export type Input = Readonly<{
  conferenceId: ConferenceId;
  maxLimit: MaxNumberOfParticipants;
  now: Date;
}>;

type UseCaseError = RestrictionNotFoundError | TimelineNotFoundError | RestrictionChangeError;

export type Output = Result<UseCaseError, Readonly<RestrictionChanged>>;

export type ChangeParticipantsRestriction = UseCase<Input, Output>;
