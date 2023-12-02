import type { ConferenceId } from '../../domain/conference';
import type { Dto } from './useCase';

export interface QueryDtoResolver {
  resolveById(conferenceId: ConferenceId): Promise<Dto | undefined>;
}
