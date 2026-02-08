import type { Result } from 'neverthrow';

declare const r: Result<string, number>;

if (r.isOk()) {
  console.log(r.value);
}
if (r.isErr()) {
  console.error(r.error);
}
