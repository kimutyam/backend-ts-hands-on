export type NonEmptyReadonlyArray<T> = [T, ...ReadonlyArray<T>];
export const NonEmptyReadonlyArray = {
  isNonEmpty: <A>(arr: ReadonlyArray<A>): arr is NonEmptyReadonlyArray<A> => arr.length > 0,
  of: <A>(head: A, ...tail: ReadonlyArray<A>): NonEmptyReadonlyArray<A> => [head, ...tail],
};
