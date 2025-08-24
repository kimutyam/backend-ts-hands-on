const add = (a: number, b: number, c: number): number => a + b + c;

const curriedAdd =
  (a: number) =>
  (b: number) =>
  (c: number): number =>
    a + b + c;

console.log(add, curriedAdd);
