import type { ConferenceId } from '../../domain/conference';
import type { PublicStatus } from '../../domain/conference/publicStatus';
import type { Restriction } from '../../domain/participants';
import type { Timeline } from '../../domain/timeline';
import type { NominalValue } from '../../util/nominal';
import type { WithAggregateId } from '../../util/resolver';
import type { UseCase } from '../useCase';

export type Input = Readonly<{ id: ConferenceId }>;

type OmitAggregateId<T extends WithAggregateId<ConferenceId>> = Omit<T, 'aggregateId'>;

export type Dto = {
  id: ConferenceId;
  publishStatus: PublicStatus;
  restriction?: OmitAggregateId<Restriction>;
  timeline?: OmitAggregateId<NominalValue<Timeline>>;
};

export type Output = Dto | undefined;

export type ResolveConferenceUseCase = UseCase<Input, Output>;
