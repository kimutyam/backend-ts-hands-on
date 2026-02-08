import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';

type ParseError = { kind: 'ParseError'; message: string };
type ValidationError = { kind: 'ValidationError'; message: string };
type User = { id: string; name: string };

const rOk: Result<User, ParseError> = ok({ id: 'user-1', name: 'Alice' });
const rErr: Result<User, ParseError> = err({
  kind: 'ParseError',
  message: 'parse error',
});

const validateName = (user: User): Result<void, ValidationError> =>
  user.name === ''
    ? err({ kind: 'ValidationError', message: 'name is empty' })
    : ok(undefined);

// Result<User, ParseError | ValidationError>
const r1 = rOk.andThrough(validateName);

// Result<User, ParseError | ValidationError>
const r2 = rErr.andThrough(validateName);

console.log(r1, r2);
