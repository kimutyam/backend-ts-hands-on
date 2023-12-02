import type { ConferenceId, ConferenceNotFoundError, PublishError } from '../../domain/conference';
import type { Published } from '../../domain/conference/published';
import type { Result } from '../../util/result';
import type { UseCase } from '../useCase';

export type Input = Readonly<{
  conferenceId: ConferenceId;
}>;

type UseCaseError = ConferenceNotFoundError | PublishError;

export type Output = Result<UseCaseError, Readonly<Published>>;

export type PublishConferenceUseCase = UseCase<Input, Output>;
