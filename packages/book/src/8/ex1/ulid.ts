import assert from 'node:assert';

import * as R from 'remeda';
import { isValid, ulid } from 'ulidx';

const assertUlid = (value: string): void => {
  assert(isValid(value));
};

const generateUlid = (): string => ulid();
const generateT = <T>(f: (value: string) => T): T => R.pipe(generateUlid(), f);

export { assertUlid, generateUlid, generateT };
