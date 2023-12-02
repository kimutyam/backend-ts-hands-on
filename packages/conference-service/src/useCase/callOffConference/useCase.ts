import type { ConferenceId, ConferenceNotFoundError, CallOffError } from '../../domain/conference';
import type { CalledOff } from '../../domain/conference/calledOff';
import type { TimelineNotFoundError } from '../../domain/timeline';
import type { Result } from '../../util/result';
import type { UseCase } from '../useCase';

export type Input = Readonly<{
  conferenceId: ConferenceId;
  reason: string;
  now: Date;
}>;

type UseCaseError = ConferenceNotFoundError | TimelineNotFoundError | CallOffError;

export type Output = Result<UseCaseError, Readonly<CalledOff>>;

export type CallOffConference = UseCase<Input, Output>;
