type ResultBase<S extends boolean> = Readonly<{
  success: S;
}>;

export type Success<T> = ResultBase<true> &
  Readonly<{
    data: T;
  }>;

export const Success = <T>(data: T): Success<T> => ({ success: true, data });
export type Failure<E> = ResultBase<false> &
  Readonly<{
    error: E;
  }>;
export const Failure = <E>(error: E): Failure<E> => ({
  success: false,
  error,
});

export type Result<E, T> = Failure<E> | Success<T>;
