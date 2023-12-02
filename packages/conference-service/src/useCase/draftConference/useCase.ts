import type { Drafted } from '../../domain/conference/drafted';
import type { Restriction, RestrictionCreated } from '../../domain/participants';
import type { Timeline, TimelineCreated } from '../../domain/timeline';
import type { InvariantsError, NominalValue } from '../../util/nominal';
import type { Result } from '../../util/result';
import type { UseCase } from '../useCase';

export type RestrictionDto = Omit<Restriction, 'aggregateId'>;
export type TimelineDto = Omit<NominalValue<Timeline>, 'aggregateId'>;

export type Input = Readonly<{
  participantsDto?: RestrictionDto;
  timelineDto?: TimelineDto;
}>;

export type UseCaseError = InvariantsError<Timeline>;

export type Output = Result<
  UseCaseError,
  Readonly<{
    drafted: Drafted;
    restrictionCreated: RestrictionCreated | undefined;
    timelineCreated: TimelineCreated | undefined;
  }>
>;

export type DraftConferenceUseCase = UseCase<Input, Output>;
