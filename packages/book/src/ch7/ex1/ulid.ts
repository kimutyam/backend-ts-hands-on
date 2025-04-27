import assert from 'node:assert';

import * as R from 'remeda';
import { isValid, ulid } from 'ulidx';

const assertUlid = (value: string): void => {
  assert(isValid(value));
};

const SEED = 123;
const generateUlid = (): string => ulid(SEED);
const generateT = <T>(f: (value: string) => T): T => R.pipe(generateUlid(), f);

export { assertUlid, generateUlid, generateT };
