import type { Result } from 'neverthrow';
import { err, ok } from 'neverthrow';

type ParseError = { message: string };
type User = { id: string; name: string };

const rOk: Result<User, ParseError> = ok({ id: 'user-1', name: 'Alice' });
const rErr: Result<User, ParseError> = err({ message: 'parse error' });

const logInfo = (message: string): void => {
  console.log(message);
};

// Result<User, ParseError>
const r1 = rOk.orTee((e) => {
  logInfo(`parse error: ${e.message}`);
});

// Result<User, ParseError>
const r2 = rErr.orTee((e) => {
  logInfo(`parse error: ${e.message}`);
});

console.log(r1, r2);
