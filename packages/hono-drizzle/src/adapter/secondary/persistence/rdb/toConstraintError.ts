import { DrizzleQueryError } from 'drizzle-orm/errors';
import { DatabaseError } from 'pg';

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

export { isConstraintError };
