import { DrizzleQueryError } from 'drizzle-orm/errors';
import { DatabaseError } from 'pg';

const toConstraintError =
  <E>(constraint: string, f: (a: DatabaseError) => E) =>
  (e: unknown): E => {
    if (e instanceof DrizzleQueryError) {
      if (e.cause instanceof DatabaseError) {
        if (e.cause.constraint === constraint) {
          return f(e.cause);
        }
      }
    }
    throw e;
  };

export { toConstraintError };
