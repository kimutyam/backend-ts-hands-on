declare function pipe<A, B>(
  value: A,
  f1: (input: A) => B,
): B;
declare function pipe<A, B, C>(
  value: A,
  f1: (input: A) => B,
  f2: (input: B) => C,
): C;

declare function pipe<A, B, C, D>(
  value: A,
  f1: (input: A) => B,
  f2: (input: B) => C,
  f3: (input: C) => D,
): D;

export { pipe };
