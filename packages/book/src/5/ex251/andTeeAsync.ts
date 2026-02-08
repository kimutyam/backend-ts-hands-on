import type { ResultAsync } from 'neverthrow';

type ParseError = { kind: 'ParseError'; message: string };
type User = { id: string; name: string };

declare const ra: ResultAsync<User, ParseError>;

declare function logInfo(message: string): void;

// Result<User, ParseError>
const ra1 = ra.andTee((user) => {
  logInfo(`user=${user.id}`);
});

console.log(ra1);
