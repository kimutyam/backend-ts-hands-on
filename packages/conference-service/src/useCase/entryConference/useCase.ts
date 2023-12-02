import type { ConferenceId } from '../../domain/conference';
import type { EntryError, AlreadyEnteredError, EntryApplied } from '../../domain/entry';
import type { TimelineNotFoundError } from '../../domain/timeline';
import type { UserAccountId } from '../../domain/userAccount/userAccountId';
import type { Result } from '../../util/result';
import type { UseCase } from '../useCase';

export type Input = Readonly<{
  userAccountId: UserAccountId;
  conferenceId: ConferenceId;
  now: Date;
}>;

type UseCaseError = AlreadyEnteredError | TimelineNotFoundError | EntryError;

export type Output = Result<UseCaseError, Readonly<EntryApplied>>;

export type EntryUseCase = UseCase<Input, Output>;
