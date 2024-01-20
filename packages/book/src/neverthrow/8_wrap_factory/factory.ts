import { ResultAsync, Result } from 'neverthrow';

const toInt = (s: string): number => {
  const parsed = Number.parseInt(s, 10);
  if (!Number.isInteger(parsed)) {
    throw new Error('Numberに変換できません');
  }
  return parsed;
};
const toErrorMessage = (e: unknown): string => {
  if (e instanceof Error) {
    return e.message;
  }
  return 'Cause unknown';
};

const toIntResult: (s: string) => Result<number, string> = Result.fromThrowable(
  toInt,
  toErrorMessage,
);
const r1: Result<number, string> = toIntResult('Invalid');

const toIntAsync = (s: string): Promise<number> =>
  new Promise((resolve, reject) => {
    try {
      const result = toInt(s);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });

const ra1: ResultAsync<number, string> = ResultAsync.fromPromise(
  toIntAsync('Invalid'),
  toErrorMessage,
);

const ra2: ResultAsync<number, never> = ResultAsync.fromSafePromise(Promise.resolve(42));

console.log(r1, ra1, ra2);
