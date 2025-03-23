const promises1: Array<Promise<number>> = [
  Promise.resolve(1),
  Promise.resolve(2),
];

const p1: Promise<Array<number>> = Promise.all(promises1);

const promises2: Array<Promise<number>> = [
  Promise.resolve(1),

  Promise.reject(new Error('Oh!')),
  Promise.resolve(2),
];

const p2: Promise<Array<number>> = Promise.all(promises2);

const run = async () => {
  // [1, 2]
  const arr1 = await p1;
  // []
  const arr2 = await p2.catch(() => []);
  console.log(arr1, arr2);
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
run();
