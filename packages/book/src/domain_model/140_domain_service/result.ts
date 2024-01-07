export type Success<T> = Readonly<{
  success: true;
  data: T;
}>;

export const Success = <T>(data: T): Success<T> => ({ success: true, data });
export type Failure<E> = Readonly<{
  success: false;
  error: E;
}>;
export const Failure = <E>(error: E): Failure<E> => ({
  success: false,
  error,
});

export type Result<E, T> = Failure<E> | Success<T>;

export const separate = <E, T>(results: Array<Result<E, T>>): [Array<E>, Array<T>] =>
  results.reduce<[Array<E>, Array<T>]>(
    (acc, result) => {
      if (result.success) {
        acc[1].push(result.data);
      } else {
        acc[0].push(result.error);
      }
      return acc;
    },
    [[], []],
  );
