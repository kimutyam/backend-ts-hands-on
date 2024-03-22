import type { ResultAsync } from 'neverthrow';

export interface UseCase<Input, Output, UseCaseError extends Error> {
  run(input: Input): ResultAsync<Output, UseCaseError>;
}
