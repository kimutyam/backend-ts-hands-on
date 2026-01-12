import { DrizzleQueryError } from 'drizzle-orm/errors';
import { DatabaseError } from 'pg';

import { OptimisticLockError } from '../../../../app/domain/optimisticLockError.js';

const isConstraintError =
  (constraint: string) =>
  (error: unknown): boolean => {
    if (error instanceof DrizzleQueryError) {
      if (error.cause instanceof DatabaseError) {
        return error.cause.constraint === constraint;
      }
    }
    return false;
  };

const throwOptimisticLockErrorIfNeeded =
  (aggregateName: string) =>
  (error: unknown): void => {
    if (isConstraintError('domain_event_aggregate_sequence_unique')(error)) {
      throw new OptimisticLockError(aggregateName);
    }
  };

export { isConstraintError, throwOptimisticLockErrorIfNeeded };
