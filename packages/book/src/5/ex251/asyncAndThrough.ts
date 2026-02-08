import type { Result, ResultAsync } from 'neverthrow';

type ParseError = { kind: 'ParseError'; message: string };
type ValidationError = { kind: 'ValidationError'; message: string };
type User = { id: string; name: string };

declare const r: Result<User, ParseError>;

declare function validateNameAsync(
  user: User,
): ResultAsync<void, ValidationError>;

// ResultAsync<User, ParseError | ValidationError>
const ra1 = r.asyncAndThrough(validateNameAsync);

console.log(ra1);
