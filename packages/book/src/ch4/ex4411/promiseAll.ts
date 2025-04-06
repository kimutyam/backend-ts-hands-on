const promises1: Array<Promise<number>> = [
  Promise.resolve(1),
  Promise.resolve(2),
];

// 1
const p1 = Promise.all(promises1);

const promises2: Array<Promise<number>> = [
  Promise.resolve(1),
  Promise.reject(new Error('err!')),
  Promise.resolve(2),
];

// 2
const p2 = Promise.all(promises2);

const run = async () => {
  // 3
  const awaited1 = await p1;
  // 4
  const awaited2 = await p2.catch((e: unknown) => {
    if (e instanceof Error) {
      return e.message;
    }
    return String(e);
  });
  console.log(awaited1, awaited2);
};

await run();
