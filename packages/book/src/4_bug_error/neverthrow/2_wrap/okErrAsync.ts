import { okAsync, errAsync } from 'neverthrow';

async function main1() {
  const okAsync1 = okAsync({ data: 'success' });
  const okAwaited1 = await okAsync1;
  okAwaited1.isOk(); // true
  okAwaited1.isErr(); // false
}

async function main2() {
  const errAsync1 = errAsync(42);
  const errAwaited1 = await errAsync1;

  errAwaited1.isOk(); // false
  errAwaited1.isErr(); // true
}

export { main1, main2 };
