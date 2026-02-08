import type { ResultAsync } from 'neverthrow';

type ParseError = { message: string };
type User = { id: string; name: string };

declare const ra: ResultAsync<User, ParseError>;

declare function logInfo(message: string): void;

// Result<User, ParseError>
const ra1 = ra.orTee((e) => {
  logInfo(`parse error: ${e.message}`);
});

console.log(ra1);
