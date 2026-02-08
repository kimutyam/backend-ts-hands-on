import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';

type ParseError = { kind: 'ParseError'; message: string };
type User = { id: string; name: string };

const rOk: Result<User, ParseError> = ok({ id: 'user-1', name: 'Alice' });
const rErr: Result<User, ParseError> = err({
  kind: 'ParseError',
  message: 'parse error',
});

const logInfo = (message: string): void => {
  console.log(message);
};

// Result<User, ParseError>
const r1 = rOk.andTee((user) => {
  logInfo(`user=${user.id}`);
});

// Result<User, ParseError>
const r2 = rErr.andTee((user) => {
  logInfo(`user=${user.id}`);
});

console.log(r1, r2);
