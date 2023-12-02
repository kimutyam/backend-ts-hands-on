export type NonEmptyArray<T> = [T, ...Array<T>];
export const NonEmptyArray = {
  isNonEmpty: <A>(arr: Array<A>): arr is NonEmptyArray<A> => arr.length > 0,
};
