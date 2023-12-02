import type { QueryDtoResolver } from './queryDtoResolver';
import type { Input, Output, ResolveConferenceUseCase } from './useCase';

export class Interactor implements ResolveConferenceUseCase {
  constructor(private resolver: QueryDtoResolver) {}

  run({ id }: Input): Promise<Output> {
    return this.resolver.resolveById(id);
  }
}
